import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  MapPin,
  Home,
  TrendingUp,
  Users,
  Euro,
} from "lucide-react";
import { Nav } from "../components/Nav";
import { getAllProperties, Property } from "../services/api";
import { BACKEND_URL } from "../config/environment";
import { getOrderBook } from "../services/api";
import { SignUpButton } from "@clerk/clerk-react";

export const DemoPlatformPage: React.FC = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // State to store bestBid for each trading property
  const [bestBids, setBestBids] = useState<{
    [propertyId: string]: number | null;
  }>({});

  // State to store market summary for each trading property
  const [marketSummaries, setMarketSummaries] = useState<{
    [propertyId: string]: { bestBid: number | null; lastTrade: number | null };
  }>({});

  // Add state for dynamic images
  const [propertyImages, setPropertyImages] = useState<{
    [key: string]: string[];
  }>({});

  useEffect(() => {
    window.scrollTo(0, 0);

    // Fetch properties from API
    const fetchProperties = async () => {
      try {
        setIsLoading(true);
        const propertiesData = await getAllProperties();
        setProperties(propertiesData);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
        setProperties([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, []);

  useEffect(() => {
    properties.forEach((property) => {
      if (property.status === "trading") {
        getOrderBook(property.id).then((data) => {
          const bids = (data.bids || [])
            .map((b: any) =>
              typeof b.price === "string"
                ? Number(b.price.replace(/[^\d.-]/g, ""))
                : b.price
            )
            .filter((b: any) => typeof b === "number" && !isNaN(b))
            .sort((a: any, b: any) => b - a);
          const bestBid = bids.length > 0 ? bids[0] : null;
          setBestBids((prev) => ({ ...prev, [property.id]: bestBid }));
        });
      }
    });
  }, [properties]); // Add properties to dependency array

  // Fetch market summaries for trading properties
  useEffect(() => {
    properties.forEach((property) => {
      if (property.status === "trading") {
        console.log(
          `Fetching market data for trading property: ${property.id}`
        );

        // Fetch order book
        fetch(`/api/orders/property/${property.id}`)
          .then((res) => res.json())
          .then((data) => {
            console.log("Order book data for", property.id, data);
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
          .catch((error) => {
            console.error("Error fetching order book for", property.id, error);
          });

        // Fetch recent trades to get last trade price
        fetch(`/api/orders/property/${property.id}/trades`)
          .then((res) => res.json())
          .then((data) => {
            console.log("Trades data for", property.id, data);
            if (data.trades && data.trades.length > 0) {
              const lastTrade = data.trades[0]; // Most recent trade
              setMarketSummaries((prev) => ({
                ...prev,
                [property.id]: {
                  ...prev[property.id],
                  lastTrade: Number(lastTrade.price),
                },
              }));
            }
          })
          .catch((error) => {
            console.error("Error fetching trades for", property.id, error);
          });
      }
    });
  }, [properties]);

  // Fetch dynamic images from backend
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

  const handleViewDetails = (propertyId: string) => {
    navigate(`/demo-platform/${propertyId}`);
  };

  // --- UPDATED PLATFORM STATS LOGIC ---
  const getTradingValue = (property: Property) => {
    const summary = marketSummaries[property.id];
    const bestBid =
      summary && typeof summary.bestBid === "number" && !isNaN(summary.bestBid)
        ? summary.bestBid
        : null;
    const lastTrade =
      summary &&
      typeof summary.lastTrade === "number" &&
      !isNaN(summary.lastTrade)
        ? summary.lastTrade
        : null;
    if (typeof bestBid === "number") {
      return bestBid * property.totalTokens;
    } else if (typeof lastTrade === "number") {
      return lastTrade * property.totalTokens;
    } else {
      return 0;
    }
  };

  const getTradingYield = (property: Property) => {
    const summary = marketSummaries[property.id];
    const bestBid =
      summary && typeof summary.bestBid === "number" && !isNaN(summary.bestBid)
        ? summary.bestBid
        : null;
    const lastTrade =
      summary &&
      typeof summary.lastTrade === "number" &&
      !isNaN(summary.lastTrade)
        ? summary.lastTrade
        : null;
    const annualRent = property.monthlyRent ? property.monthlyRent * 12 : 0;
    let yieldValue = 0;
    if (bestBid && property.totalTokens) {
      yieldValue = (annualRent / (bestBid * property.totalTokens)) * 100;
    } else if (lastTrade && property.totalTokens) {
      yieldValue = (annualRent / (lastTrade * property.totalTokens)) * 100;
    }
    return yieldValue;
  };

  // Calculate stats using dynamic values for trading properties
  const totalValue = properties.reduce((sum, prop) => {
    if (prop.status === "trading") {
      return sum + getTradingValue(prop);
    } else {
      return sum + prop.price;
    }
  }, 0);

  const totalTokens = properties.reduce(
    (sum, prop) => sum + prop.totalTokens,
    0
  );

  const avgYield = (() => {
    if (properties.length === 0) return 0;
    let total = 0;
    properties.forEach((prop) => {
      if (prop.status === "trading") {
        total += getTradingYield(prop);
      } else {
        total += prop.yield;
      }
    });
    return total / properties.length;
  })();

  // Helper to prepend backend URL to image paths
  const getFullImageUrl = (path: string) =>
    path.startsWith("http") ? path : `${BACKEND_URL}${path}`;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Nav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-gray-100 mb-6">
            Demo Platform
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Explore our tokenized real estate investment opportunities. Start
            investing with as little as €1.
          </p>
        </div>

        {/* Platform Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 text-center shadow-lg">
            <div className="w-12 h-12 rounded-lg bg-black dark:bg-white flex items-center justify-center mx-auto mb-3">
              <Home className="w-6 h-6 text-white dark:text-black" />
            </div>
            <p className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-1">
              3
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Properties
            </p>
          </div>

          <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 text-center shadow-lg">
            <div className="w-12 h-12 rounded-lg bg-black dark:bg-white flex items-center justify-center mx-auto mb-3">
              <Euro className="w-6 h-6 text-white dark:text-black" />
            </div>
            <p className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-1">
              {formatPrice(totalValue).replace("€", "€")}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total Value
            </p>
          </div>

          <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 text-center shadow-lg">
            <div className="w-12 h-12 rounded-lg bg-black dark:bg-white flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-white dark:text-black" />
            </div>
            <p className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-1">
              {formatNumber(totalTokens)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total Tokens
            </p>
          </div>

          <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 text-center shadow-lg">
            <div className="w-12 h-12 rounded-lg bg-black dark:bg-white flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-white dark:text-black" />
            </div>
            <p className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-1">
              {avgYield.toFixed(1)}%
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Avg. Yield
            </p>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            <p>Loading properties...</p>
          ) : properties.length === 0 ? (
            <p>No properties found.</p>
          ) : (
            properties.map((property) => (
              <div
                key={property.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                {/* Property Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={
                      propertyImages[property.id]?.[0]
                        ? getFullImageUrl(propertyImages[property.id][0])
                        : property.image || "/assets/default-property.jpg"
                    }
                    alt={property.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-black dark:bg-white text-white dark:text-black px-3 py-1 rounded-full text-sm font-light">
                    {(() => {
                      if (property.status === "funding") {
                        return `${property.yield}% Yield`;
                      }
                      const summary = marketSummaries[property.id];
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
                      const annualRent = property.monthlyRent
                        ? property.monthlyRent * 12
                        : 0;
                      let yieldValue = 0;
                      if (bestBid && property.totalTokens) {
                        yieldValue =
                          (annualRent / (bestBid * property.totalTokens)) * 100;
                      } else if (lastTrade && property.totalTokens) {
                        yieldValue =
                          (annualRent / (lastTrade * property.totalTokens)) *
                          100;
                      }
                      return yieldValue > 0
                        ? `${yieldValue.toFixed(1)}% Yield`
                        : "-";
                    })()}
                  </div>
                  {property.status === "trading" && (
                    <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-light">
                      Trading Active
                    </div>
                  )}
                  {property.status === "funding" && (
                    <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-light">
                      Funding
                    </div>
                  )}
                </div>

                {/* Property Details */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-light text-gray-900 dark:text-gray-100 mb-2">
                      {property.name}
                    </h3>
                    <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{property.location}</span>
                    </div>
                    <div className="text-2xl font-light text-gray-900 dark:text-gray-100">
                      {property.status === "trading"
                        ? (() => {
                            const summary = marketSummaries[property.id];
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

                            // Platform Value (dynamic)
                            let platformValue = "-";
                            let tokenPrice = "-";
                            let valueSource = "";
                            if (typeof bestBid === "number") {
                              tokenPrice = formatPrice(bestBid);
                              platformValue = formatPrice(
                                bestBid * Number(property.totalTokens)
                              );
                              valueSource = "Best Bid";
                            } else if (typeof lastTrade === "number") {
                              tokenPrice = formatPrice(lastTrade);
                              platformValue = formatPrice(
                                lastTrade * Number(property.totalTokens)
                              );
                              valueSource = "Last Trade";
                            } else {
                              // Fallback: use current token value from property
                              const fallbackTokenPrice =
                                property.currentTokenValue || 1000; // Default to €1000 if not set
                              tokenPrice = formatPrice(fallbackTokenPrice);
                              platformValue = formatPrice(
                                fallbackTokenPrice *
                                  Number(property.totalTokens)
                              );
                              valueSource = "Starting Price";
                            }

                            return (
                              <div>
                                <div className="mb-2">
                                  <span className="text-sm text-gray-600 dark:text-gray-400">
                                    Market Value:{" "}
                                  </span>
                                  <span className="text-lg">
                                    {property.marketValue
                                      ? formatPrice(
                                          Number(property.marketValue)
                                        )
                                      : formatPrice(Number(property.price))}
                                  </span>
                                </div>
                                <div className="mb-2">
                                  <span className="text-sm text-gray-600 dark:text-gray-400">
                                    Token Price:{" "}
                                  </span>
                                  <span className="text-lg">
                                    {tokenPrice}
                                    {valueSource && (
                                      <span className="ml-2 text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                                        {valueSource}
                                      </span>
                                    )}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-sm text-gray-600 dark:text-gray-400">
                                    Platform Value:{" "}
                                  </span>
                                  <span className="text-lg">
                                    {platformValue}
                                  </span>
                                </div>
                              </div>
                            );
                          })()
                        : (() => {
                            // For funding properties, show market value if available, otherwise fall back to price
                            const displayValue = property.marketValue
                              ? Number(property.marketValue)
                              : Number(property.price);
                            return formatPrice(displayValue);
                          })()}
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                    {property.description}
                  </p>

                  {/* Property Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                    <div>
                      <p className="text-lg font-light text-gray-900 dark:text-gray-100">
                        {property.bedrooms}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Bedrooms
                      </p>
                    </div>
                    <div>
                      <p className="text-lg font-light text-gray-900 dark:text-gray-100">
                        {property.bathrooms}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Bathrooms
                      </p>
                    </div>
                    <div>
                      <p className="text-lg font-light text-gray-900 dark:text-gray-100">
                        {property.sqm}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        m²
                      </p>
                    </div>
                  </div>

                  {/* Investment Status */}
                  {property.status === "funding" &&
                    property.capitalRaised &&
                    property.targetCapital && (
                      <div className="mb-4">
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
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${getFundingPercentage(property.capitalRaised, property.targetCapital)}%`,
                            }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {formatPrice(property.capitalRaised)} /{" "}
                          {formatPrice(property.targetCapital)}
                        </p>
                      </div>
                    )}

                  {property.status === "trading" && (
                    <div className="mb-4">
                      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Fully Funded - Trading Active
                          </span>
                        </div>

                        {/* Token Price and Platform Value */}
                        {(() => {
                          const summary = marketSummaries[property.id];
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

                          // Always show token price and platform value, with fallback if no market data
                          const tokenPrice =
                            bestBid ||
                            lastTrade ||
                            property.currentTokenValue ||
                            1000;
                          const platformValue =
                            tokenPrice * Number(property.totalTokens);
                          const valueSource = bestBid
                            ? "Best Bid"
                            : lastTrade
                              ? "Last Trade"
                              : "Starting Price";

                          return (
                            <div className="mt-3 space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  Token Price
                                </span>
                                <div className="flex items-center space-x-2">
                                  <span className="text-lg font-medium text-green-600 dark:text-green-400">
                                    {formatPrice(tokenPrice)}
                                  </span>
                                  <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                                    {valueSource}
                                  </span>
                                </div>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  Platform Value
                                </span>
                                <span className="text-lg font-medium text-green-600 dark:text-green-400">
                                  {formatPrice(platformValue)}
                                </span>
                              </div>
                              {!bestBid && !lastTrade && (
                                <div className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
                                  No orders yet - be the first to trade!
                                </div>
                              )}
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  )}

                  {/* Investment Info */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Min. Investment
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {property.status === "trading"
                          ? (() => {
                              const summary = marketSummaries[property.id];
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
                                return `€${bestBid.toFixed(2)}`;
                              } else if (typeof lastTrade === "number") {
                                return `Last Trade: €${lastTrade.toFixed(2)}`;
                              } else {
                                return "-";
                              }
                            })()
                          : `€${property.minInvestment}`}
                      </span>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <button
                    onClick={() => handleViewDetails(property.id)}
                    className="w-full bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg font-light
                           flex items-center justify-center space-x-2
                           hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-300
                           transform hover:scale-105 active:scale-95"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-light text-gray-900 dark:text-gray-100 mb-4">
            Ready to Start Investing?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of investors who are already building their real
            estate portfolio through tokenization
          </p>
          <SignUpButton mode="modal">
            <button
              className="inline-flex items-center bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-lg font-light
                     hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-300
                     transform hover:scale-105 active:scale-95"
            >
              Get Started Today
            </button>
          </SignUpButton>
        </div>
      </div>
    </div>
  );
};
