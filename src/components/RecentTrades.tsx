import React, { useState, useEffect } from "react";
import { Clock, TrendingUp, TrendingDown } from "lucide-react";
import {
  getTradeHistory,
  subscribeToTrades,
  initializeMarketConnection,
  disconnectMarket,
} from "../services/marketApi";

interface Trade {
  id: string;
  price: number;
  quantity: number;
  timestamp: Date;
  side: "buy" | "sell";
  total: number;
}

interface RecentTradesProps {
  propertyId: string;
}

export const RecentTrades: React.FC<RecentTradesProps> = ({ propertyId }) => {
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    let isMounted = true;
    initializeMarketConnection();
    // Fetch initial trades
    getTradeHistory(propertyId)
      .then((data: any) => {
        if (!isMounted) return;
        // Map backend data to frontend format
        let tradesArr = Array.isArray(data.trades) ? data.trades : data;
        setTrades(
          tradesArr.map((t: any) => ({
            id: t.id?.toString() ?? "",
            price: t.price,
            quantity: t.amount ?? t.quantity ?? 0,
            timestamp: (() => {
              if (typeof t.timestamp === "string") {
                const [datePart, timePart] = t.timestamp.split(" ");
                if (datePart && timePart) {
                  return new Date(datePart + "T" + timePart);
                }
              }
              return new Date(t.timestamp);
            })(),
            side: t.side ?? (t.buy_order_id ? "buy" : "sell"),
            total: (t.price || 0) * (t.amount ?? t.quantity ?? 0),
          }))
        );
      })
      .catch(() => {});
    // Subscribe to real-time updates
    unsubscribe = subscribeToTrades(propertyId, (data: any) => {
      let tradesArr = Array.isArray(data.trades) ? data.trades : data;
      setTrades(
        tradesArr.map((t: any) => ({
          id: t.id?.toString() ?? "",
          price: t.price,
          quantity: t.amount ?? t.quantity ?? 0,
          timestamp: (() => {
            if (typeof t.timestamp === "string") {
              const [datePart, timePart] = t.timestamp.split(" ");
              if (datePart && timePart) {
                return new Date(datePart + "T" + timePart);
              }
            }
            return new Date(t.timestamp);
          })(),
          side: t.side ?? (t.buy_order_id ? "buy" : "sell"),
          total: (t.price || 0) * (t.amount ?? t.quantity ?? 0),
        }))
      );
    });
    return () => {
      isMounted = false;
      if (unsubscribe) unsubscribe();
      disconnectMarket();
    };
  }, [propertyId]);

  const formatPrice = (price: any) => {
    const num = typeof price === "number" ? price : Number(price);
    return `€${!isNaN(num) && isFinite(num) ? num.toFixed(2) : "0.00"}`;
  };
  const formatQuantity = (quantity: number) => quantity.toString();
  const formatTotal = (total: number) => `€${total.toFixed(0)}`;

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;

    return timestamp.toLocaleDateString();
  };

  const now = new Date();
  // Calculate stats for the last 1 month (30 days in the past only)
  const tradesLastMonth = trades.filter((trade) => {
    const diff = now.getTime() - trade.timestamp.getTime();
    return diff >= 0 && diff <= 30 * 24 * 60 * 60 * 1000;
  });
  const totalVolume = tradesLastMonth.reduce(
    (sum, trade) => sum + trade.total,
    0
  );
  const avgPrice =
    tradesLastMonth.length > 0
      ? tradesLastMonth.reduce((sum, trade) => sum + Number(trade.price), 0) /
        tradesLastMonth.length
      : 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <h3 className="text-xl font-light text-gray-900 dark:text-gray-100">
            Recent Trades
          </h3>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600 dark:text-gray-400">24h Volume</p>
          <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
            {formatTotal(totalVolume)}
          </p>
        </div>
      </div>

      {/* Trade Statistics */}
      <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Avg Price (Last Month)
          </p>
          <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
            {formatPrice(avgPrice)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Total Trades
          </p>
          <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
            {trades.length}
          </p>
        </div>
      </div>

      {/* Trades Header */}
      <div className="grid grid-cols-4 gap-2 text-xs text-gray-500 dark:text-gray-400 pb-3 border-b border-gray-200 dark:border-gray-700 mb-3">
        <span>Time</span>
        <span className="text-right">Price</span>
        <span className="text-right">Quantity</span>
        <span className="text-right">Total</span>
      </div>

      {/* Trades List */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {trades.map((trade, index) => (
          <div
            key={trade.id}
            className={`grid grid-cols-4 gap-2 text-xs py-2 px-2 rounded transition-all duration-300 ${
              index === 0 ? "bg-blue-50 dark:bg-blue-900/20 animate-pulse" : ""
            } hover:bg-gray-50 dark:hover:bg-gray-700`}
          >
            <div className="flex items-center space-x-1">
              {trade.side === "buy" ? (
                <TrendingUp className="w-3 h-3 text-green-600" />
              ) : (
                <TrendingDown className="w-3 h-3 text-red-600" />
              )}
              <span className="text-gray-600 dark:text-gray-400">
                {formatTime(trade.timestamp)}
              </span>
            </div>

            <span
              className={`text-right font-medium ${
                trade.side === "buy"
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {formatPrice(trade.price)}
            </span>

            <span className="text-right text-gray-900 dark:text-gray-100">
              {formatQuantity(trade.quantity)}
            </span>

            <span className="text-right text-gray-600 dark:text-gray-400">
              {formatTotal(trade.total)}
            </span>
          </div>
        ))}
      </div>

      {trades.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>No recent trades</p>
        </div>
      )}
    </div>
  );
};
