import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Home,
  Bath,
  Square,
  TrendingUp,
  Euro,
  Users,
  Calendar,
  Shield,
  BarChart3,
  FileText,
  Minus,
  Plus,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Bar,
} from "recharts";
// Fix for missing types for react-plotly.js
// @ts-ignore
import Plot from "react-plotly.js";
import { Nav } from "../components/Nav";
import { OrderBook } from "../components/OrderBook";
import { RecentTrades } from "../components/RecentTrades";
import { TradingInterface } from "../components/TradingInterface";
import {
  initializeMarketConnection,
  disconnectMarket,
  placeOrder,
  getOrderBook,
  subscribeToOrderBook,
} from "../services/marketApi";
import type { OrderRequest, OrderResponse } from "../services/marketApi";
import { properties } from "../data/properties";
import { BACKEND_URL } from "../config/environment";
import { useUser } from "@clerk/clerk-react";

interface Property {
  id: string;
  name: string;
  location: string;
  price: number;
  description: string;
  fullDescription: string;
  images: string[];
  bedrooms: number;
  bathrooms: number;
  sqm: number;
  type: string;
  yield: number;
  minInvestment: number;
  totalTokens: number;
  availableTokens?: number;
  capitalRaised?: number;
  targetCapital?: number;
  status: "funding" | "trading";
  currentTokenValue?: number;
  yearBuilt: number;
  monthlyRent: number;
  propertyTax: number;
  hoa: number;
  features: string[];
  neighborhood: string;
  walkScore: number;
}

// Sample token price history data for the trading property
const tokenPriceHistory = [
  { month: "Jun", price: 38.5 },
  { month: "Jul", price: 39.2 },
  { month: "Aug", price: 40.1 },
  { month: "Sep", price: 39.8 },
  { month: "Oct", price: 41.3 },
  { month: "Nov", price: 42.1 },
  { month: "Dec", price: 42.8 },
];

// Helper to get property by id
const getPropertyById = (id: string | undefined) =>
  properties.find((p) => p.id === id);

// Helper to prepend backend URL to image paths
const getFullImageUrl = (path: string) =>
  path.startsWith("http") ? path : `${BACKEND_URL}${path}`;

export const PropertyDetailPage: React.FC = () => {
  const { propertyId } = useParams<{ propertyId: string }>();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);
  const [orderError, setOrderError] = useState<string | null>(null);
  const { isLoaded, isSignedIn, user } = useUser();
  const [bestBid, setBestBid] = useState<number | null>(null);
  const [bestAsk, setBestAsk] = useState<number | null>(null);
  const [lastTradePrice, setLastTradePrice] = useState<number | null>(null);
  const [recentTrades, setRecentTrades] = useState<any[]>([]);
  // State for market summary
  const [marketSummary, setMarketSummary] = useState<{
    bestBid: number | null;
    lastTrade: number | null;
  }>({ bestBid: null, lastTrade: null });
  // Add state for dynamic images
  const [dynamicImages, setDynamicImages] = useState<string[] | null>(null);

  const property = propertyId ? getPropertyById(propertyId) : null;

  useEffect(() => {
    window.scrollTo(0, 0);

    // Initialize market connection for trading properties
    if (property?.status === "trading") {
      initializeMarketConnection();
    }

    return () => {
      if (property?.status === "trading") {
        disconnectMarket();
      }
    };
  }, []);

  // Debug: log bestBid, bestAsk, and order book data
  React.useEffect(() => {
    console.log("DEBUG: bestBid", bestBid, "bestAsk", bestAsk);
  }, [bestBid, bestAsk]);

  // Fetch best bid/ask from order book and recent trades
  useEffect(() => {
    let unsubscribeOrderBook: (() => void) | undefined;
    let unsubscribeTrades: (() => void) | undefined;
    if (!property) return;
    getOrderBook(property.id).then((data) => {
      const bids = (data.bids || [])
        .map((b: any) => ({
          ...b,
          price:
            typeof b.price === "string"
              ? Number(b.price.replace(/[^\d.-]/g, ""))
              : b.price,
        }))
        .filter((b: any) => typeof b.price === "number" && !isNaN(b.price))
        .sort((a: any, b: any) => b.price - a.price);
      const asks = (data.asks || [])
        .map((a: any) => ({
          ...a,
          price:
            typeof a.price === "string"
              ? Number(a.price.replace(/[^\d.-]/g, ""))
              : a.price,
        }))
        .filter((a: any) => typeof a.price === "number" && !isNaN(a.price))
        .sort((a: any, b: any) => a.price - b.price);
      setBestBid(bids.length > 0 ? bids[0].price : null);
      setBestAsk(asks.length > 0 ? asks[0].price : null);
    });
    unsubscribeOrderBook = subscribeToOrderBook(property.id, (data: any) => {
      const bids = (data.bids || [])
        .map((b: any) => ({
          ...b,
          price:
            typeof b.price === "string"
              ? Number(b.price.replace(/[^\d.-]/g, ""))
              : b.price,
        }))
        .filter((b: any) => typeof b.price === "number" && !isNaN(b.price))
        .sort((a: any, b: any) => b.price - a.price);
      const asks = (data.asks || [])
        .map((a: any) => ({
          ...a,
          price:
            typeof a.price === "string"
              ? Number(a.price.replace(/[^\d.-]/g, ""))
              : a.price,
        }))
        .filter((a: any) => typeof a.price === "number" && !isNaN(a.price))
        .sort((a: any, b: any) => a.price - b.price);
      setBestBid(bids.length > 0 ? bids[0].price : null);
      setBestAsk(asks.length > 0 ? asks[0].price : null);
    });
    // Fetch recent trades
    import("../services/marketApi").then(
      ({ getTradeHistory, subscribeToTrades }) => {
        getTradeHistory(property.id).then((data: any) => {
          let tradesArr = Array.isArray(data.trades) ? data.trades : data;
          setRecentTrades(tradesArr);
          console.log("DEBUG: tradesArr", tradesArr);
          setLastTradePrice(
            tradesArr.length > 0 ? Number(tradesArr[0].price) : null
          );
        });
        unsubscribeTrades = subscribeToTrades(property.id, (data: any) => {
          let tradesArr = Array.isArray(data.trades) ? data.trades : data;
          setRecentTrades(tradesArr);
          console.log("DEBUG: tradesArr", tradesArr);
          setLastTradePrice(
            tradesArr.length > 0 ? Number(tradesArr[0].price) : null
          );
        });
      }
    );
    return () => {
      if (unsubscribeOrderBook) unsubscribeOrderBook();
      if (unsubscribeTrades) unsubscribeTrades && unsubscribeTrades();
    };
  }, [property]);

  // Fetch dynamic images from backend
  useEffect(() => {
    if (!propertyId) return;
    fetch("/api/property-images")
      .then((res) => res.json())
      .then((data) => {
        if (data && data[propertyId]) {
          setDynamicImages(data[propertyId]);
        }
      })
      .catch(() => setDynamicImages(null));
  }, [propertyId]);

  useEffect(() => {
    if (property?.status === "trading" && property.id) {
      fetch(`/api/market/${property.id}/summary`)
        .then((res) => res.json())
        .then((data) =>
          setMarketSummary({ bestBid: data.bestBid, lastTrade: data.lastTrade })
        );
    }
  }, [property?.id, property?.status]);

  // Build token price history from recent trades, only the first trade of each quarter (for background bars)
  const chartDataFirstOfQuarter = React.useMemo(() => {
    if (!recentTrades || recentTrades.length === 0) return [];
    // Helper to get quarter label
    const getQuarterLabel = (date: Date) => {
      const year = date.getFullYear();
      const month = date.getMonth();
      const quarter = Math.floor(month / 3) + 1;
      return `Q${quarter} ${year}`;
    };
    // Group by quarter, keep only the first trade in each quarter
    const grouped: {
      [quarter: string]: { quarter: string; date: Date; price: number };
    } = {};
    recentTrades.forEach((trade: any) => {
      const date = new Date(trade.timestamp);
      const quarter = getQuarterLabel(date);
      if (!grouped[quarter] || date < grouped[quarter].date) {
        grouped[quarter] = { quarter, date, price: Number(trade.price) };
      }
    });
    // Sort by date ascending
    return Object.values(grouped).sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );
  }, [recentTrades]);

  // Build token price history from recent trades, grouped by quarter for axis, but plot all trades as points
  const chartDataDetailed = React.useMemo(() => {
    if (!recentTrades || recentTrades.length === 0) return [];
    // Helper to get quarter label
    const getQuarterLabel = (date: Date) => {
      const year = date.getFullYear();
      const month = date.getMonth();
      const quarter = Math.floor(month / 3) + 1;
      return `Q${quarter} ${year}`;
    };
    // Map each trade to its quarter label
    return recentTrades
      .map((trade: any) => {
        const date = new Date(trade.timestamp);
        return {
          quarter: getQuarterLabel(date),
          date: date,
          price: Number(trade.price),
        };
      })
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [recentTrades]);

  // The TradingInterface orderData: { type, orderType, quantity, price?, total }
  const handlePlaceOrder = async (orderData: any): Promise<void> => {
    if (!property) return;
    if (!isSignedIn || !user) {
      setOrderError("Please log in to activate trading.");
      return;
    }
    setOrderError(null);
    setOrderSuccess(null);
    try {
      const fullOrderData: OrderRequest = {
        property_id: property.id,
        user_id: user.fullName || user.username || user.id,
        side: orderData.type,
        price:
          orderData.orderType === "market"
            ? bestAsk || bestBid || property.currentTokenValue || 42.8
            : orderData.price,
        amount: orderData.quantity,
      };
      const response: OrderResponse = await placeOrder(fullOrderData);
      if (response.status === "filled") {
        setOrderSuccess(
          `Order placed successfully! ${orderData.type === "buy" ? "Bought" : "Sold"} ${orderData.quantity} tokens.`
        );
      } else {
        setOrderSuccess(
          `Order placed and is ${response.status}. Order ID: ${response.orderId}`
        );
      }
    } catch (error) {
      setOrderError(
        error instanceof Error ? error.message : "Failed to place order"
      );
    }
  };

  if (!property) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Nav />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <h1 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-4">
            Property Not Found
          </h1>
          <button
            onClick={() => navigate("/demo-platform")}
            className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg font-light hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-300"
          >
            Back to Properties
          </button>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("de-DE").format(num);
  };

  const getFundingPercentage = (raised: number, target: number) => {
    return Math.round((raised / target) * 100);
  };

  // Calculate property value and annual yield based on property status
  let displayPropertyValue = 0;
  let displayAnnualYield = 0;
  if (property.status === "funding") {
    displayPropertyValue = property.price;
    displayAnnualYield = property.yield;
  } else {
    // Trading: use calculated values
    const currentTokenValue = property
      ? bestBid !== null
        ? bestBid
        : property.currentTokenValue || 0
      : 0;
    displayPropertyValue = property
      ? currentTokenValue * property.totalTokens
      : 0;
    displayAnnualYield =
      displayPropertyValue > 0 && property && property.monthlyRent !== undefined
        ? ((property.monthlyRent * 12) / displayPropertyValue) * 100
        : 0;
  }

  // --- Investment Calculator helpers ---
  // Determine which price to use for token calculation
  let tokenPriceSource = "";
  let tokenPrice = 0;
  if (property?.status === "trading") {
    if (bestAsk !== null && !isNaN(bestAsk)) {
      tokenPrice = bestAsk;
      tokenPriceSource = "Current market ask price";
    } else if (typeof lastTradePrice === "number" && !isNaN(lastTradePrice)) {
      tokenPrice = lastTradePrice;
      tokenPriceSource = "Last traded price";
    } else if (property.currentTokenValue) {
      tokenPrice = property.currentTokenValue;
      tokenPriceSource = "Default token value";
    } else {
      tokenPrice = property.price / property.totalTokens;
      tokenPriceSource = "Original token price";
    }
  } else {
    // Funding: always use original token price
    tokenPrice = property.price / property.totalTokens;
    tokenPriceSource = "Original token price";
  }

  // --- New Investment Calculator State ---
  const [tokenInput, setTokenInput] = useState(1);
  const maxTokens = property ? property.totalTokens : 1;
  const minTokens = 1;
  const sanitizedTokenInput = Math.max(
    minTokens,
    Math.min(maxTokens, Math.floor(tokenInput) || 1)
  );
  const investmentAmount = sanitizedTokenInput * tokenPrice;

  // Monthly return: (monthlyRent / totalTokens) * tokensToBuy
  const calculateMonthlyReturn = (tokensToBuy: number) => {
    if (!property || property.monthlyRent === undefined) return 0;
    return (property.monthlyRent / property.totalTokens) * tokensToBuy;
  };

  // Calculate property value based on current market value (bestBid) and total tokens
  const currentTokenValue = property
    ? bestBid !== null
      ? bestBid
      : property.currentTokenValue || 0
    : 0;
  const propertyMarketValue = property
    ? currentTokenValue * property.totalTokens
    : 0;

  // Calculate annual yield as (monthlyRent * 12) / propertyMarketValue * 100
  const calculatedAnnualYield =
    propertyMarketValue > 0 && property && property.monthlyRent !== undefined
      ? ((property.monthlyRent * 12) / propertyMarketValue) * 100
      : 0;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Nav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-8">
          <button
            onClick={() => navigate("/demo-platform")}
            className="hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
          >
            Demo Platform
          </button>
          <span>/</span>
          <span className="text-gray-900 dark:text-gray-100">
            {property.name}
          </span>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate("/demo-platform")}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Properties</span>
        </button>

        {/* Name input for user_id */}
        <div className="mb-8 max-w-md mx-auto">
          {!isLoaded && (
            <div className="text-center text-gray-600 dark:text-gray-400">
              Loading...
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Images and Details */}
          <div className="space-y-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative h-96 rounded-2xl overflow-hidden">
                {(dynamicImages ?? property?.images ?? []).length > 0 && (
                  <>
                    <img
                      src={getFullImageUrl(
                        (dynamicImages ?? property?.images ?? [])[
                          currentImageIndex
                        ]
                      )}
                      alt={property?.name}
                      className="w-full h-full object-cover"
                    />
                    {(dynamicImages ?? property?.images ?? []).length > 1 && (
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {(dynamicImages ?? property?.images ?? []).map(
                          (_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                                index === currentImageIndex
                                  ? "bg-white"
                                  : "bg-white/50 hover:bg-white/75"
                              }`}
                            />
                          )
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>

              {(dynamicImages ?? property?.images ?? []).length > 1 && (
                <div className="grid grid-cols-3 gap-2">
                  {(dynamicImages ?? property?.images ?? []).map(
                    (image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative h-24 rounded-lg overflow-hidden transition-all duration-300 ${
                          index === currentImageIndex
                            ? "ring-2 ring-black dark:ring-white"
                            : "hover:opacity-75"
                        }`}
                      >
                        <img
                          src={getFullImageUrl(image)}
                          alt={`${property?.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    )
                  )}
                </div>
              )}
            </div>

            {/* Property Info */}
            <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8">
              <h1 className="text-3xl font-light text-gray-900 dark:text-gray-100 mb-4">
                {property.name}
              </h1>

              <div className="flex items-center text-gray-600 dark:text-gray-400 mb-6">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{property.location}</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-lg bg-black dark:bg-white flex items-center justify-center mx-auto mb-2">
                    <Home className="w-6 h-6 text-white dark:text-black" />
                  </div>
                  <p className="text-lg font-light text-gray-900 dark:text-gray-100">
                    {property.bedrooms}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Bedrooms
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 rounded-lg bg-black dark:bg-white flex items-center justify-center mx-auto mb-2">
                    <Bath className="w-6 h-6 text-white dark:text-black" />
                  </div>
                  <p className="text-lg font-light text-gray-900 dark:text-gray-100">
                    {property.bathrooms}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Bathrooms
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 rounded-lg bg-black dark:bg-white flex items-center justify-center mx-auto mb-2">
                    <Square className="w-6 h-6 text-white dark:text-black" />
                  </div>
                  <p className="text-lg font-light text-gray-900 dark:text-gray-100">
                    {property.sqm}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">m²</p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 rounded-lg bg-black dark:bg-white flex items-center justify-center mx-auto mb-2">
                    <Calendar className="w-6 h-6 text-white dark:text-black" />
                  </div>
                  <p className="text-lg font-light text-gray-900 dark:text-gray-100">
                    {property.yearBuilt}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Year Built
                  </p>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {property.fullDescription}
              </p>
            </div>

            {/* Features */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-6">
                Property Features
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {(property.features || []).map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-black dark:bg-white rounded-full" />
                    <span className="text-gray-600 dark:text-gray-400">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Investment Details */}
          <div className="space-y-8">
            {/* Price and Yield */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-3xl font-light text-gray-900 dark:text-gray-100 mb-2">
                    {formatPrice(displayPropertyValue)}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Property Value
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-light text-green-600 dark:text-green-400 mb-2">
                    {displayAnnualYield.toFixed(1)}%
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Annual Yield
                  </p>
                </div>
              </div>

              {/* Investment Status */}
              {property.status === "funding" &&
                property.capitalRaised &&
                property.targetCapital && (
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <span>Capital Raised</span>
                      <span>
                        {getFundingPercentage(
                          property.capitalRaised,
                          property.targetCapital
                        )}
                        %
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div
                        className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                        style={{
                          width: `${getFundingPercentage(property.capitalRaised, property.targetCapital)}%`,
                        }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      {formatPrice(property.capitalRaised)} /{" "}
                      {formatPrice(property.targetCapital)}
                    </p>
                  </div>
                )}

              {property.status === "trading" && (
                <div className="mb-6">
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                    <h4 className="text-lg font-medium text-green-800 dark:text-green-200 mb-2">
                      Fully Funded - Trading Active
                    </h4>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-green-600 dark:text-green-400">
                        Current Token Value
                      </span>
                      <span className="text-xl font-light text-green-600 dark:text-green-400">
                        {(() => {
                          const bestBid =
                            typeof marketSummary.bestBid === "number"
                              ? marketSummary.bestBid
                              : marketSummary.bestBid !== null &&
                                  marketSummary.bestBid !== undefined
                                ? Number(marketSummary.bestBid)
                                : null;
                          const lastTrade =
                            typeof marketSummary.lastTrade === "number"
                              ? marketSummary.lastTrade
                              : marketSummary.lastTrade !== null &&
                                  marketSummary.lastTrade !== undefined
                                ? Number(marketSummary.lastTrade)
                                : null;
                          if (typeof bestBid === "number" && !isNaN(bestBid)) {
                            return `€${bestBid.toFixed(2)}`;
                          } else if (
                            typeof lastTrade === "number" &&
                            !isNaN(lastTrade)
                          ) {
                            return `Last Trade: €${lastTrade.toFixed(2)}`;
                          } else {
                            return "-";
                          }
                        })()}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Token Price Chart for Trading Properties */}
            {property.status === "trading" && (
              <>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                  <h3 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-6">
                    Token Price History
                  </h3>
                  <div className="h-64 mb-4">
                    {recentTrades && recentTrades.length > 0 ? (
                      <Plot
                        data={[
                          {
                            x: recentTrades.map(
                              (trade: any) => new Date(trade.timestamp)
                            ),
                            y: recentTrades.map((trade: any) =>
                              Number(trade.price)
                            ),
                            type: "scatter",
                            mode: "lines+markers",
                            marker: { color: "#059669" },
                            line: { color: "#059669", width: 3 },
                            name: "Token Price",
                          },
                        ]}
                        layout={{
                          autosize: true,
                          height: 240,
                          margin: { l: 40, r: 20, t: 10, b: 40 },
                          paper_bgcolor: "rgba(0,0,0,0)",
                          plot_bgcolor: "rgba(0,0,0,0)",
                          xaxis: {
                            title: "",
                            tickformat: "%b %Y",
                            color: "#6B7280",
                            gridcolor: "#374151",
                          },
                          yaxis: {
                            title: "",
                            color: "#6B7280",
                            gridcolor: "#374151",
                          },
                          font: { color: "#6B7280" },
                          showlegend: false,
                          hovermode: "closest",
                        }}
                        config={{ displayModeBar: false, responsive: true }}
                        style={{ width: "100%", height: "100%" }}
                      />
                    ) : (
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={tokenPriceHistory}>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#374151"
                          />
                          <XAxis
                            dataKey="month"
                            stroke="#6B7280"
                            tick={{ fill: "#6B7280", fontSize: 12 }}
                          />
                          <YAxis
                            stroke="#6B7280"
                            tick={{ fill: "#6B7280", fontSize: 12 }}
                            domain={["dataMin - 1", "dataMax + 1"]}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#1F2937",
                              border: "none",
                              borderRadius: "0.5rem",
                              color: "#F3F4F6",
                            }}
                            formatter={(value: number) => [
                              `€${value.toFixed(2)}`,
                              "Token Price",
                            ]}
                          />
                          <Line
                            type="monotone"
                            dataKey="price"
                            stroke="#059669"
                            strokeWidth={3}
                            dot={{ fill: "#059669", strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6, fill: "#059669" }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      Current Market Value
                    </p>
                    <p className="text-2xl font-light text-green-600 dark:text-green-400">
                      {bestBid !== null ? `€${bestBid.toFixed(2)}` : "-"}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 mb-1">
                      Last Trade Price
                    </p>
                    <p className="text-2xl font-light text-blue-600 dark:text-blue-400">
                      {typeof lastTradePrice === "number" &&
                      !isNaN(lastTradePrice)
                        ? `€${lastTradePrice.toFixed(2)}`
                        : "-"}
                    </p>
                  </div>
                </div>

                {/* Market Data Components */}
                <div className="grid lg:grid-cols-2 gap-8">
                  <OrderBook propertyId={property.id} />
                  <RecentTrades propertyId={property.id} />
                </div>

                {/* Trading Interface */}
                <TradingInterface
                  propertyId={property.id}
                  bestBid={bestBid}
                  bestAsk={bestAsk}
                  currentPrice={property.currentTokenValue || 42.8}
                  onPlaceOrder={handlePlaceOrder}
                  disabled={!isSignedIn}
                />

                {/* Order Status Messages */}
                {orderSuccess && (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <p className="text-green-800 dark:text-green-200">
                      {orderSuccess}
                    </p>
                  </div>
                )}

                {orderError && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <p className="text-red-800 dark:text-red-200">
                      {orderError}
                    </p>
                  </div>
                )}
              </>
            )}

            {/* Investment Calculator */}
            <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-6">
                Investment Calculator
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                    Tokens
                  </label>
                  <div className="relative flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() =>
                        setTokenInput(
                          Math.max(minTokens, sanitizedTokenInput - 1)
                        )
                      }
                      disabled={sanitizedTokenInput <= minTokens}
                      className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      min={minTokens}
                      max={maxTokens}
                      step={1}
                      value={sanitizedTokenInput}
                      onChange={(e) => {
                        const val = Math.floor(Number(e.target.value));
                        setTokenInput(isNaN(val) ? minTokens : val);
                      }}
                      className="flex-1 px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 dark:text-white text-center text-lg font-light focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all duration-300"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setTokenInput(
                          Math.min(maxTokens, sanitizedTokenInput + 1)
                        )
                      }
                      disabled={sanitizedTokenInput >= maxTokens}
                      className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Enter the number of tokens (1 - {maxTokens})
                  </p>

                  {/* Quick Selection Buttons */}
                  <div className="grid grid-cols-4 gap-2 mt-3">
                    {[1, 10, 100, 1000].map((qty) => (
                      <button
                        key={qty}
                        type="button"
                        onClick={() => setTokenInput(Math.min(maxTokens, qty))}
                        className={`py-2 px-3 text-sm rounded-lg transition-all duration-300 ${
                          sanitizedTokenInput === qty
                            ? "bg-black dark:bg-white text-white dark:text-black"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                        }`}
                      >
                        {qty}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-900 rounded-lg p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      Investment Amount
                    </p>
                    <p className="text-xl font-light text-gray-900 dark:text-gray-100">
                      €
                      {investmentAmount.toLocaleString("de-DE", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-900 rounded-lg p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      Monthly Return
                    </p>
                    <p className="text-xl font-light text-green-600 dark:text-green-400">
                      €{calculateMonthlyReturn(sanitizedTokenInput).toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Show which price was used for calculation */}
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Calculation uses{" "}
                  <span className="font-medium">€{tokenPrice.toFixed(2)}</span>{" "}
                  per token ({tokenPriceSource}).
                </div>

                <button
                  className="w-full bg-black dark:bg-white text-white dark:text-black px-6 py-4 rounded-lg font-light
                           hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-300
                           transform hover:scale-105 active:scale-95"
                  disabled={
                    sanitizedTokenInput < minTokens ||
                    sanitizedTokenInput > maxTokens
                  }
                >
                  {property.status === "funding" ? "Invest Now" : "Buy Tokens"}
                </button>
              </div>
            </div>

            {/* Financial Details */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-6">
                Financial Details
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">
                    Monthly Rent
                  </span>
                  <span className="text-gray-900 dark:text-gray-100 font-light">
                    {formatPrice(property.monthlyRent ?? 0)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">
                    Property Tax (Monthly)
                  </span>
                  <span className="text-gray-900 dark:text-gray-100 font-light">
                    €{formatNumber(property.propertyTax ?? 0)}
                  </span>
                </div>
                {property.hoa && property.hoa > 0 && (
                  <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">
                      HOA Fees
                    </span>
                    <span className="text-gray-900 dark:text-gray-100 font-light">
                      €{formatNumber(property.hoa ?? 0)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-600 dark:text-gray-400">
                    Walk Score
                  </span>
                  <span className="text-gray-900 dark:text-gray-100 font-light">
                    {property.walkScore ?? 0}/100
                  </span>
                </div>
              </div>
            </div>

            {/* Security Features */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8">
              <h3 className="text-xl font-light text-gray-900 dark:text-gray-100 mb-6">
                Investment Security
              </h3>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="text-gray-600 dark:text-gray-400">
                    Blockchain-secured ownership
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <BarChart3 className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="text-gray-600 dark:text-gray-400">
                    Professional property management
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="text-gray-600 dark:text-gray-400">
                    Transparent reporting
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="text-gray-600 dark:text-gray-400">
                    Liquid secondary market
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
