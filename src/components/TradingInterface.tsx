import React, { useState } from "react";
import { Plus, Minus, TrendingUp, TrendingDown, Loader2 } from "lucide-react";
import { useClerk } from "@clerk/clerk-react";

interface TradingInterfaceProps {
  propertyId: string;
  bestBid: number | null;
  bestAsk: number | null;
  currentPrice: number;
  onPlaceOrder: (order: OrderData) => void;
  disabled?: boolean;
}

interface OrderData {
  type: "buy" | "sell";
  orderType: "market" | "limit";
  quantity: number;
  price?: number;
  total: number;
}

export const TradingInterface: React.FC<TradingInterfaceProps> = ({
  propertyId,
  bestBid,
  bestAsk,
  currentPrice,
  onPlaceOrder,
  disabled = false,
}) => {
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");
  const [orderType, setOrderType] = useState<"market" | "limit">("market");
  const [quantity, setQuantity] = useState<number>(10);
  const [limitPrice, setLimitPrice] = useState<number>(
    bestAsk ?? bestBid ?? currentPrice
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const clerk = useClerk();

  // Always use the latest bestAsk/bestBid for market orders
  const getMarketPrice = () => {
    if (orderType === "market") {
      if (activeTab === "buy") {
        return bestAsk;
      } else {
        return bestBid;
      }
    }
    return limitPrice;
  };

  // Loading and liquidity checks
  const isOrderBookLoading =
    orderType === "market" &&
    ((activeTab === "buy" && bestAsk === undefined) ||
      (activeTab === "sell" && bestBid === undefined));
  const isNoLiquidity =
    orderType === "market" &&
    ((activeTab === "buy" && (bestAsk === null || bestAsk === undefined)) ||
      (activeTab === "sell" && (bestBid === null || bestBid === undefined)));
  const isSubmitDisabled = isOrderBookLoading || isNoLiquidity || isSubmitting;

  // Keep limitPrice in sync with bestAsk/bestBid when switching from market to limit
  React.useEffect(() => {
    if (orderType === "limit") {
      if (activeTab === "buy" && bestAsk != null) {
        setLimitPrice(bestAsk);
      } else if (activeTab === "sell" && bestBid != null) {
        setLimitPrice(bestBid);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderType, activeTab, bestAsk, bestBid]);

  const calculateTotal = () => {
    const price = getMarketPrice();
    // @ts-expect-error: price is checked above and cannot be null here
    return price * quantity;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (disabled) {
      if (clerk && typeof clerk.openSignIn === "function") {
        clerk.openSignIn();
      }
      return;
    }
    setIsSubmitting(true);

    try {
      let price = getMarketPrice();
      if (price == null || isNaN(price) || price <= 0) {
        // Prevent submitting if price is not available
        setIsSubmitting(false);
        return;
      }
      price = Number(price);
      const orderData: OrderData = {
        type: activeTab,
        orderType,
        quantity,
        price: price ?? 0,
        total: calculateTotal(),
      };

      await onPlaceOrder(orderData);

      // Reset form
      setQuantity(10);
      setLimitPrice(currentPrice);
    } catch (error) {
      console.error("Failed to place order:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatPrice = (price: number | undefined | null): string => {
    if (price == null || isNaN(price)) return "€0.00";
    return `€${Number(price).toFixed(2)}`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
      <h3 className="text-xl font-light text-gray-900 dark:text-gray-100 mb-6">
        Place Order
      </h3>
      {/* Buy/Sell Tabs */}
      <div className="flex mb-6 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
        <button
          onClick={() => setActiveTab("buy")}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-all duration-300 ${
            activeTab === "buy"
              ? "bg-green-600 text-white shadow-md"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Buy</span>
        </button>
        <button
          onClick={() => setActiveTab("sell")}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-all duration-300 ${
            activeTab === "sell"
              ? "bg-red-600 text-white shadow-md"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
          }`}
        >
          <TrendingDown className="w-4 h-4" />
          <span>Sell</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Order Type */}
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            Order Type
          </label>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => setOrderType("market")}
              className={`flex-1 py-2 px-4 rounded-lg text-sm transition-all duration-300 ${
                orderType === "market"
                  ? "bg-black dark:bg-white text-white dark:text-black"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              Market
            </button>
            <button
              type="button"
              onClick={() => setOrderType("limit")}
              className={`flex-1 py-2 px-4 rounded-lg text-sm transition-all duration-300 ${
                orderType === "limit"
                  ? "bg-black dark:bg-white text-white dark:text-black"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              Limit
            </button>
          </div>
        </div>

        {/* Limit Price (only for limit orders) */}
        {orderType === "limit" && (
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Limit Price
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                €
              </span>
              <input
                type="number"
                step="0.01"
                min="0"
                value={limitPrice}
                onChange={(e) => setLimitPrice(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all duration-300"
                required
              />
            </div>
          </div>
        )}

        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            Quantity
          </label>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
            >
              <Minus className="w-4 h-4" />
            </button>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
              className="flex-1 px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 dark:text-white text-center focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all duration-300"
              required
            />
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Quantity Buttons */}
        <div className="grid grid-cols-4 gap-2">
          {[10, 25, 50, 100].map((qty) => (
            <button
              key={qty}
              type="button"
              onClick={() => setQuantity(qty)}
              className="py-2 px-3 text-sm rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
            >
              {qty}
            </button>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              Price per token
            </span>
            <span className="text-gray-900 dark:text-gray-100">
              {orderType === "market" ? (
                isOrderBookLoading ? (
                  <span className="inline-flex items-center">
                    <Loader2 className="animate-spin w-4 h-4 mr-1" /> Loading...
                  </span>
                ) : isNoLiquidity ? (
                  <span className="text-red-600">N/A</span>
                ) : activeTab === "buy" ? (
                  formatPrice(bestAsk)
                ) : (
                  formatPrice(bestBid)
                )
              ) : (
                formatPrice(limitPrice)
              )}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Quantity</span>
            <span className="text-gray-900 dark:text-gray-100">
              {quantity} tokens
            </span>
          </div>
          <div className="flex justify-between text-sm border-t border-gray-200 dark:border-gray-600 pt-2">
            <span className="text-gray-600 dark:text-gray-400">Total</span>
            <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
              {formatPrice(calculateTotal())}
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitDisabled}
          className={`w-full py-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
            activeTab === "buy"
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-red-600 hover:bg-red-700 text-white"
          }`}
        >
          {isOrderBookLoading
            ? "Loading Order Book..."
            : isNoLiquidity
              ? activeTab === "buy"
                ? "No asks available"
                : "No bids available"
              : isSubmitting
                ? "Placing Order..."
                : `${activeTab === "buy" ? "Buy" : "Sell"} Tokens`}
        </button>
        {isNoLiquidity && (
          <div className="mt-2 text-center text-red-600 text-sm">
            {activeTab === "buy"
              ? "No asks available in the order book. You cannot place a market buy order right now."
              : "No bids available in the order book. You cannot place a market sell order right now."}
          </div>
        )}
      </form>
    </div>
  );
};
