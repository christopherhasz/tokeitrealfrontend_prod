import axios from "axios";
import { config, endpoints, logger } from "../config/environment";

const API_BASE_URL = config.apiUrl;
const WS_BASE_URL = config.wsUrl;

export interface OrderBookData {
  bids: Array<{
    price: number;
    quantity: number;
    total: number;
  }>;
  asks: Array<{
    price: number;
    quantity: number;
    total: number;
  }>;
  spread: number;
  lastPrice: number;
}

export interface TradeData {
  id: string;
  price: number;
  quantity: number;
  timestamp: string;
  side: "buy" | "sell";
  total: number;
}

export interface OrderRequest {
  property_id: string;
  user_id: string;
  side: "buy" | "sell";
  price: number;
  amount: number;
}

export interface OrderResponse {
  orderId: string;
  status: "pending" | "filled" | "cancelled";
  message: string;
}

// WebSocket connection for real-time updates
class MarketWebSocket {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private listeners: Map<string, Set<(data: any) => void>> = new Map();

  connect() {
    try {
      const wsUrl = `${WS_BASE_URL}${endpoints.websocket}`;
      logger.log("Connecting to WebSocket:", wsUrl);
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        logger.log("Market WebSocket connected successfully");
        this.reconnectAttempts = 0;
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          logger.log("WebSocket message received:", data);
          this.notifyListeners(data.type, data.payload);
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };

      this.ws.onclose = (event) => {
        logger.log("Market WebSocket disconnected:", event.code, event.reason);
        this.attemptReconnect();
      };

      this.ws.onerror = (error) => {
        logger.error("Market WebSocket error:", error);
      };
    } catch (error) {
      logger.error("Failed to create WebSocket connection:", error);
      this.attemptReconnect();
    }
  }

  private attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay =
        this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);

      logger.log(
        `Attempting to reconnect in ${delay}ms... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`
      );

      setTimeout(() => {
        this.connect();
      }, delay);
    } else {
      logger.error(
        "Max reconnection attempts reached. WebSocket connection failed."
      );
    }
  }

  subscribe(eventType: string, callback: (data: any) => void) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, new Set());
    }
    this.listeners.get(eventType)!.add(callback);

    // Subscribe to specific property updates
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(
        JSON.stringify({
          action: "subscribe",
          eventType,
        })
      );
    }
  }

  unsubscribe(eventType: string, callback: (data: any) => void) {
    const listeners = this.listeners.get(eventType);
    if (listeners) {
      listeners.delete(callback);
      if (listeners.size === 0) {
        this.listeners.delete(eventType);

        // Unsubscribe from server
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
          this.ws.send(
            JSON.stringify({
              action: "unsubscribe",
              eventType,
            })
          );
        }
      }
    }
  }

  private notifyListeners(eventType: string, data: any) {
    const listeners = this.listeners.get(eventType);
    if (listeners) {
      listeners.forEach((callback) => callback(data));
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.listeners.clear();
  }
}

// Create singleton instance
export const marketWebSocket = new MarketWebSocket();

// API functions
export const getOrderBook = async (
  propertyId: string
): Promise<OrderBookData> => {
  try {
    logger.log(`Fetching order book for property: ${propertyId}`);
    const response = await axios.get(
      `${API_BASE_URL}${endpoints.orderBook(propertyId)}`,
      {
        timeout: 10000,
      }
    );

    logger.log("Order book data received:", response.data);
    return response.data;
  } catch (error) {
    logger.error("Failed to fetch order book:", error);
    throw new Error("Failed to fetch order book data");
  }
};

export const getTradeHistory = async (
  propertyId: string,
  limit = 50
): Promise<TradeData[]> => {
  try {
    logger.log(`Fetching trade history for property: ${propertyId}`);
    const response = await axios.get(
      `${API_BASE_URL}${endpoints.trades(propertyId)}`,
      {
        params: { limit },
      }
    );

    logger.log("Trade history data received:", response.data);
    return response.data;
  } catch (error) {
    logger.error("Failed to fetch trade history:", error);
    throw new Error("Failed to fetch trade history");
  }
};

export const placeOrder = async (
  orderData: OrderRequest
): Promise<OrderResponse> => {
  try {
    logger.log("Placing order:", orderData);
    const response = await axios.post(
      `${API_BASE_URL}${endpoints.orders}`,
      orderData,
      {
        timeout: 15000,
        headers: {
          "Content-Type": "application/json",
          // Add authentication headers here when implemented
          // 'Authorization': `Bearer ${getAuthToken()}`
        },
      }
    );

    logger.log("Order placed successfully:", response.data);
    return response.data;
  } catch (error) {
    logger.error("Failed to place order:", error);
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage =
        error.response.data?.message || "Failed to place order";
      throw new Error(errorMessage);
    }
    throw new Error("Failed to place order");
  }
};

// Market data subscription hooks
export const subscribeToOrderBook = (
  propertyId: string,
  callback: (data: OrderBookData) => void
) => {
  marketWebSocket.subscribe(`orderbook:${propertyId}`, callback);
  return () => marketWebSocket.unsubscribe(`orderbook:${propertyId}`, callback);
};

export const subscribeToTrades = (
  propertyId: string,
  callback: (data: TradeData) => void
) => {
  marketWebSocket.subscribe(`trades:${propertyId}`, callback);
  return () => marketWebSocket.unsubscribe(`trades:${propertyId}`, callback);
};

// Initialize WebSocket connection
export const initializeMarketConnection = () => {
  logger.log("Initializing market WebSocket connection...");
  marketWebSocket.connect();
};

// Cleanup function
export const disconnectMarket = () => {
  logger.log("Disconnecting market WebSocket...");
  marketWebSocket.disconnect();
};

export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await axios.get(`${API_BASE_URL}${endpoints.health}`, {
      timeout: 5000,
    });
    return response.status === 200;
  } catch (error) {
    logger.error("API health check failed:", error);
    return false;
  }
};
