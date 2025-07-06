import React, { useState, useEffect } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import {
  getOrderBook,
  subscribeToOrderBook,
  initializeMarketConnection,
  disconnectMarket,
} from "../services/marketApi";

interface OrderBookEntry {
  price: number;
  quantity: number;
  total: number;
}

interface OrderBookProps {
  propertyId: string;
}

export const OrderBook: React.FC<OrderBookProps> = ({ propertyId }) => {
  const [orderBook, setOrderBook] = useState<{
    bids: OrderBookEntry[];
    asks: OrderBookEntry[];
    spread: number;
    lastPrice: number;
  }>({
    bids: [],
    asks: [],
    spread: 0,
    lastPrice: 0,
  });

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    let isMounted = true;
    initializeMarketConnection();
    // Fetch initial order book
    getOrderBook(propertyId)
      .then((data) => {
        if (!isMounted) return;
        // Map backend data to frontend format
        const bids = (data.bids || []).map((b: any) => ({
          price: b.price,
          quantity: b.amount ?? b.quantity ?? 0,
          total: (b.price || 0) * (b.amount ?? b.quantity ?? 0),
        }));
        const asks = (data.asks || []).map((a: any) => ({
          price: a.price,
          quantity: a.amount ?? a.quantity ?? 0,
          total: (a.price || 0) * (a.amount ?? a.quantity ?? 0),
        }));
        const bestBid = bids[0]?.price || 0;
        const bestAsk = asks[0]?.price || 0;
        setOrderBook({
          bids,
          asks,
          spread: bestAsk && bestBid ? bestAsk - bestBid : 0,
          lastPrice: bestBid, // fallback, ideally get from market stats
        });
      })
      .catch(() => {});
    // Subscribe to real-time updates
    unsubscribe = subscribeToOrderBook(propertyId, (data: any) => {
      const bids = (data.bids || []).map((b: any) => ({
        price: b.price,
        quantity: b.amount ?? b.quantity ?? 0,
        total: (b.price || 0) * (b.amount ?? b.quantity ?? 0),
      }));
      const asks = (data.asks || []).map((a: any) => ({
        price: a.price,
        quantity: a.amount ?? a.quantity ?? 0,
        total: (a.price || 0) * (a.amount ?? a.quantity ?? 0),
      }));
      const bestBid = bids[0]?.price || 0;
      const bestAsk = asks[0]?.price || 0;
      setOrderBook((prev) => ({
        ...prev,
        bids,
        asks,
        spread: bestAsk && bestBid ? bestAsk - bestBid : 0,
      }));
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

  const bestBid = orderBook.bids[0]?.price || 0;
  const bestAsk = orderBook.asks[0]?.price || 0;
  const spreadPercentage =
    bestAsk > 0 ? ((bestAsk - bestBid) / bestAsk) * 100 : 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-light text-gray-900 dark:text-gray-100">
          Order Book
        </h3>
        <div className="text-right">
          <p className="text-sm text-gray-600 dark:text-gray-400">Spread</p>
          <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
            {formatPrice(orderBook.spread)} ({spreadPercentage.toFixed(2)}%)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Bids */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <h4 className="text-sm font-medium text-green-600 dark:text-green-400">
              Bids
            </h4>
          </div>

          <div className="space-y-1">
            <div className="grid grid-cols-3 gap-2 text-xs text-gray-500 dark:text-gray-400 pb-2 border-b border-gray-200 dark:border-gray-700">
              <span>Price</span>
              <span className="text-right">Quantity</span>
              <span className="text-right">Total</span>
            </div>

            {orderBook.bids.slice(0, 8).map((bid, index) => (
              <div
                key={index}
                className="grid grid-cols-3 gap-2 text-xs py-1 hover:bg-green-50 dark:hover:bg-green-900/20 rounded transition-colors duration-200"
              >
                <span className="text-green-600 dark:text-green-400 font-medium">
                  {formatPrice(bid.price)}
                </span>
                <span className="text-right text-gray-900 dark:text-gray-100">
                  {formatQuantity(bid.quantity)}
                </span>
                <span className="text-right text-gray-600 dark:text-gray-400">
                  {formatTotal(bid.total)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Asks */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <TrendingDown className="w-4 h-4 text-red-600" />
            <h4 className="text-sm font-medium text-red-600 dark:text-red-400">
              Asks
            </h4>
          </div>

          <div className="space-y-1">
            <div className="grid grid-cols-3 gap-2 text-xs text-gray-500 dark:text-gray-400 pb-2 border-b border-gray-200 dark:border-gray-700">
              <span>Price</span>
              <span className="text-right">Quantity</span>
              <span className="text-right">Total</span>
            </div>

            {orderBook.asks.slice(0, 8).map((ask, index) => (
              <div
                key={index}
                className="grid grid-cols-3 gap-2 text-xs py-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors duration-200"
              >
                <span className="text-red-600 dark:text-red-400 font-medium">
                  {formatPrice(ask.price)}
                </span>
                <span className="text-right text-gray-900 dark:text-gray-100">
                  {formatQuantity(ask.quantity)}
                </span>
                <span className="text-right text-gray-600 dark:text-gray-400">
                  {formatTotal(ask.total)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
