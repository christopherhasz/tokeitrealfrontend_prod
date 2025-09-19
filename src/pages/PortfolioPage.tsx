import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  TrendingUp,
  TrendingDown,
  Euro,
  Home,
  BarChart3,
  Calendar,
  Eye,
  Wallet,
} from "lucide-react";
import { Nav } from "../components/Nav";
import { BACKEND_URL } from "../config/environment";
import { useUser } from "@clerk/clerk-react";
import {
  getUserPortfolio,
  getUserBalance,
  PortfolioItem,
  getAllProperties,
  Property,
} from "../services/api";

interface UserHolding {
  propertyId: string;
  tokensOwned: number;
  averagePurchasePrice: number;
  totalInvested: number;
  currentValue: number;
  monthlyReturn: number;
  totalReturn: number;
  returnPercentage: number;
}

export const PortfolioPage: React.FC = () => {
  const navigate = useNavigate();
  const { isLoaded, isSignedIn, user } = useUser();
  const [holdings, setHoldings] = useState<UserHolding[]>([]);
  const [userBalance, setUserBalance] = useState<string>("0.00");
  const [portfolioData, setPortfolioData] = useState<PortfolioItem[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [marketSummaries, setMarketSummaries] = useState<{
    [propertyId: string]: { bestBid: number | null; lastTrade: number | null };
  }>({});
  const [propertyImages, setPropertyImages] = useState<{
    [key: string]: string[];
  }>({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch properties from API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const propertiesData = await getAllProperties();
        setProperties(propertiesData);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
        // Fallback to empty properties
        setProperties([]);
      }
    };

    fetchProperties();
  }, []);

  // Fetch user portfolio and balance from backend
  useEffect(() => {
    if (isSignedIn && user) {
      const fetchPortfolioData = async () => {
        try {
          setIsLoading(true);
          const [portfolioResponse, balanceResponse] = await Promise.all([
            getUserPortfolio(user.id),
            getUserBalance(user.id),
          ]);

          setPortfolioData(portfolioResponse.portfolio);
          setUserBalance(balanceResponse.balance);

          // Convert backend portfolio data to frontend format
          const convertedHoldings: UserHolding[] =
            portfolioResponse.portfolio.map((item) => {
              const totalInvested = item.total_tokens * item.avg_price;
              const currentValue = item.total_value || totalInvested;
              const totalReturn = currentValue - totalInvested;
              const returnPercentage =
                totalInvested > 0 ? (totalReturn / totalInvested) * 100 : 0;

              // Mock monthly return for now (in real app, this would come from backend)
              const monthlyReturn = totalInvested * 0.005; // 0.5% monthly return

              return {
                propertyId: item.property_id,
                tokensOwned: item.total_tokens,
                averagePurchasePrice: item.avg_price,
                totalInvested,
                currentValue,
                monthlyReturn,
                totalReturn,
                returnPercentage,
              };
            });

          setHoldings(convertedHoldings);
        } catch (error) {
          console.error("Failed to fetch portfolio data:", error);
          // Fallback to empty portfolio
          setHoldings([]);
          setPortfolioData([]);
        } finally {
          setIsLoading(false);
        }
      };

      fetchPortfolioData();
    }
  }, [isSignedIn, user]);

  // Fetch market summaries for trading properties
  useEffect(() => {
    properties.forEach((property) => {
      if (property.status === "trading") {
        fetch(`/api/orders/property/${property.id}`)
          .then((res) => res.json())
          .then((data) => {
            setMarketSummaries((prev) => ({
              ...prev,
              [property.id]: {
                bestBid:
                  data.bids && data.bids.length > 0
                    ? Number(data.bids[0].price)
                    : null,
                lastTrade: null, // We'll get this from trades table later
              },
            }));
          })
          .catch(() => {});
      }
    });
  }, [properties]);

  // Fetch property images
  useEffect(() => {
    fetch("/api/property-images")
      .then((res) => res.json())
      .then((data) => setPropertyImages(data))
      .catch(() => setPropertyImages({}));
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("de-DE").format(num);
  };

  const getFullImageUrl = (path: string) =>
    path.startsWith("http") ? path : `${BACKEND_URL}${path}`;

  const getCurrentTokenValue = (propertyId: string) => {
    const property = properties.find((p) => p.id === propertyId);
    if (!property) return 0;

    if (property.status === "trading") {
      const summary = marketSummaries[propertyId];
      const bestBid =
        summary &&
        typeof summary.bestBid === "number" &&
        !isNaN(summary.bestBid)
          ? summary.bestBid
          : null;
      const lastTrade =
        summary &&
        typeof summary.lastTrade === "number" &&
        !isNaN(summary.lastTrade)
          ? summary.lastTrade
          : null;

      if (typeof bestBid === "number") {
        return bestBid;
      } else if (typeof lastTrade === "number") {
        return lastTrade;
      } else {
        return (
          property.currentTokenValue || property.price / property.totalTokens
        );
      }
    } else {
      return property.price / property.totalTokens;
    }
  };

  // Calculate portfolio totals
  const portfolioTotals = holdings.reduce(
    (totals, holding) => {
      const currentTokenValue = getCurrentTokenValue(holding.propertyId);
      const currentValue = holding.tokensOwned * currentTokenValue;
      const totalReturn = currentValue - holding.totalInvested;

      return {
        totalInvested: totals.totalInvested + holding.totalInvested,
        currentValue: totals.currentValue + currentValue,
        monthlyReturn: totals.monthlyReturn + holding.monthlyReturn,
        totalReturn: totals.totalReturn + totalReturn,
      };
    },
    { totalInvested: 0, currentValue: 0, monthlyReturn: 0, totalReturn: 0 }
  );

  const portfolioReturnPercentage =
    portfolioTotals.totalInvested > 0
      ? (portfolioTotals.totalReturn / portfolioTotals.totalInvested) * 100
      : 0;

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Nav />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <div className="text-gray-600 dark:text-gray-400">Loading...</div>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Nav />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <h1 className="text-3xl font-light text-gray-900 dark:text-gray-100 mb-4">
            Sign In Required
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Please sign in to view your portfolio
          </p>
          <button
            onClick={() => navigate("/demo-platform")}
            className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg font-light hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-300"
          >
            Back to Demo Platform
          </button>
        </div>
      </div>
    );
  }

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
          <span className="text-gray-900 dark:text-gray-100">Portfolio</span>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate("/demo-platform")}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Demo Platform</span>
        </button>

        {/* Balance Display */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl px-8 py-4">
            <Wallet className="w-6 h-6 text-green-600 dark:text-green-400" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Available Balance
              </p>
              <p className="text-2xl font-light text-gray-900 dark:text-gray-100">
                {formatPrice(parseFloat(userBalance))}
              </p>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-gray-100 mb-6">
            My Portfolio
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Track your real estate token investments and performance
          </p>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 text-center shadow-lg">
            <div className="w-12 h-12 rounded-lg bg-black dark:bg-white flex items-center justify-center mx-auto mb-3">
              <Euro className="w-6 h-6 text-white dark:text-black" />
            </div>
            <p className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-1">
              {formatPrice(portfolioTotals.totalInvested)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total Invested
            </p>
          </div>

          <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 text-center shadow-lg">
            <div className="w-12 h-12 rounded-lg bg-black dark:bg-white flex items-center justify-center mx-auto mb-3">
              <BarChart3 className="w-6 h-6 text-white dark:text-black" />
            </div>
            <p className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-1">
              {formatPrice(portfolioTotals.currentValue)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Current Value
            </p>
          </div>

          <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 text-center shadow-lg">
            <div className="w-12 h-12 rounded-lg bg-black dark:bg-white flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-6 h-6 text-white dark:text-black" />
            </div>
            <p className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-1">
              {formatPrice(portfolioTotals.monthlyReturn)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Monthly Return
            </p>
          </div>

          <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 text-center shadow-lg">
            <div className="w-12 h-12 rounded-lg bg-black dark:bg-white flex items-center justify-center mx-auto mb-3">
              {portfolioReturnPercentage >= 0 ? (
                <TrendingUp className="w-6 h-6 text-white dark:text-black" />
              ) : (
                <TrendingDown className="w-6 h-6 text-white dark:text-black" />
              )}
            </div>
            <p
              className={`text-2xl font-light mb-1 ${
                portfolioReturnPercentage >= 0
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {portfolioReturnPercentage >= 0 ? "+" : ""}
              {portfolioReturnPercentage.toFixed(2)}%
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total Return
            </p>
          </div>
        </div>

        {/* Holdings List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-6">
            Your Holdings
          </h2>

          {isLoading ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center shadow-lg">
              <div className="text-gray-600 dark:text-gray-400">
                Loading portfolio...
              </div>
            </div>
          ) : holdings.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center shadow-lg">
              <Home className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-light text-gray-900 dark:text-gray-100 mb-2">
                No Holdings Yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Start investing in tokenized real estate to build your portfolio
              </p>
              <button
                onClick={() => navigate("/demo-platform")}
                className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg font-light hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-300"
              >
                Browse Properties
              </button>
            </div>
          ) : (
            <div className="grid gap-6">
              {holdings.map((holding) => {
                const property = properties.find(
                  (p) => p.id === holding.propertyId
                );
                if (!property) return null;

                const currentTokenValue = getCurrentTokenValue(
                  holding.propertyId
                );
                const currentValue = holding.tokensOwned * currentTokenValue;
                const totalReturn = currentValue - holding.totalInvested;
                const returnPercentage =
                  (totalReturn / holding.totalInvested) * 100;

                return (
                  <div
                    key={holding.propertyId}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
                  >
                    <div className="grid md:grid-cols-3 gap-6 p-6">
                      {/* Property Image and Info */}
                      <div className="flex space-x-4">
                        <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={
                              propertyImages[property.id]?.[0]
                                ? getFullImageUrl(
                                    propertyImages[property.id][0]
                                  )
                                : property.image ||
                                  "/assets/default-property.jpg"
                            }
                            alt={property.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-light text-gray-900 dark:text-gray-100 mb-1">
                            {property.name}
                          </h3>
                          <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span className="text-sm">{property.location}</span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                            <span>{holding.tokensOwned} tokens</span>
                            <span>•</span>
                            <span>{property.type}</span>
                          </div>
                        </div>
                      </div>

                      {/* Investment Details */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                            Total Invested
                          </p>
                          <p className="text-lg font-light text-gray-900 dark:text-gray-100">
                            {formatPrice(holding.totalInvested)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                            Current Value
                          </p>
                          <p className="text-lg font-light text-gray-900 dark:text-gray-100">
                            {formatPrice(currentValue)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                            Avg. Purchase Price
                          </p>
                          <p className="text-lg font-light text-gray-900 dark:text-gray-100">
                            {formatPrice(holding.averagePurchasePrice)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                            Current Token Price
                          </p>
                          <p className="text-lg font-light text-gray-900 dark:text-gray-100">
                            {formatPrice(currentTokenValue)}
                          </p>
                        </div>
                      </div>

                      {/* Performance and Actions */}
                      <div className="flex flex-col justify-between">
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                              Monthly Return
                            </p>
                            <p className="text-lg font-light text-green-600 dark:text-green-400">
                              {formatPrice(holding.monthlyReturn)}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                              Total Return
                            </p>
                            <div className="flex items-center space-x-2">
                              <p
                                className={`text-lg font-light ${
                                  returnPercentage >= 0
                                    ? "text-green-600 dark:text-green-400"
                                    : "text-red-600 dark:text-red-400"
                                }`}
                              >
                                {returnPercentage >= 0 ? "+" : ""}
                                {formatPrice(totalReturn)}
                              </p>
                              <span
                                className={`text-sm ${
                                  returnPercentage >= 0
                                    ? "text-green-600 dark:text-green-400"
                                    : "text-red-600 dark:text-red-400"
                                }`}
                              >
                                ({returnPercentage >= 0 ? "+" : ""}
                                {returnPercentage.toFixed(2)}%)
                              </span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            navigate(`/demo-platform/${property.id}`)
                          }
                          className="flex items-center justify-center space-x-2 bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg font-light hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-300 mt-4"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View Details</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
