import axios from "axios";
import { config, endpoints, logger } from "../config/environment";
import { APIError, ApiResponse } from "../types";

const API_URL = config.apiUrl;
const RECAPTCHA_SITE_KEY = "6LeqeSUrAAAAAPHkkwK9SsGZYZlfNNZG_lXLeBMC";
const MAX_RETRIES = 2;
const RETRY_DELAY = 1000;

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const executeRecaptcha = async (action: string): Promise<string> => {
  try {
    await new Promise<void>((resolve) => {
      window.grecaptcha.ready(() => resolve());
    });

    const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, {
      action,
    });
    return token;
  } catch (error) {
    console.error("reCAPTCHA error:", error);
    throw new Error("Failed to verify reCAPTCHA. Please try again.");
  }
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const handleApiError = (error: unknown): never => {
  if (axios.isAxiosError(error) && error.response) {
    const errorData = error.response.data as APIError;
    const statusCode = error.response.status;

    logger.error("API Error:", {
      statusCode,
      errorData,
      url: error.config?.url,
    });

    if (statusCode === 400) {
      if (errorData.error === "E-Mail ist erforderlich") {
        throw new Error("Email is required");
      } else if (
        errorData.error === "Diese E-Mail-Adresse ist bereits angemeldet"
      ) {
        throw new Error("This email address is already subscribed");
      } else if (errorData.error === "Ungültige E-Mail-Adresse") {
        throw new Error("Please enter a valid email address");
      }
    } else if (statusCode === 429) {
      throw new Error("Too many attempts. Please try again later.");
    } else if (statusCode >= 500) {
      throw new Error("Server error. Please try again later.");
    }

    if (errorData.error) {
      throw new Error(`Request failed: ${errorData.error}`);
    }
  }

  if (error instanceof Error) {
    throw error;
  }

  throw new Error("An unexpected error occurred. Please try again later.");
};

export const subscribeToNewsletter = async (
  email: string
): Promise<ApiResponse> => {
  let retries = 0;

  while (retries <= MAX_RETRIES) {
    try {
      const recaptchaToken = await executeRecaptcha("NEWSLETTER");
      const response = await api.post<ApiResponse>(endpoints.newsletter, {
        email,
        recaptchaToken,
      });

      logger.log("Newsletter subscription successful:", response.data);
      return response.data;
    } catch (error) {
      logger.error("Newsletter subscription error:", error);

      if (
        !axios.isAxiosError(error) ||
        !error.response ||
        error.response.status >= 500
      ) {
        if (retries < MAX_RETRIES) {
          retries++;
          await delay(RETRY_DELAY * retries); // Exponential backoff
          continue;
        }
      }

      handleApiError(error);
    }
  }

  throw new Error("Failed to subscribe after multiple attempts");
};

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

export interface PortfolioItem {
  property_id: string;
  property_name?: string;
  total_tokens: number;
  avg_price: number;
  current_price?: number;
  total_value?: number;
  profit_loss?: number;
}

export interface PortfolioResponse {
  portfolio: PortfolioItem[];
}

export interface BalanceResponse {
  balance: string;
}

export interface Property {
  id: string;
  name: string;
  location: string;
  price: number;
  description: string;
  fullDescription?: string;
  image?: string;
  images?: string[];
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
  marketValue?: number;
  yearBuilt?: number;
  monthlyRent?: number;
  propertyTax?: number;
  hoa?: number;
  features?: string[];
  neighborhood?: string;
  walkScore?: number;
}

export const getAllProperties = async (): Promise<Property[]> => {
  try {
    const response = await api.get<Property[]>(endpoints.properties);
    return response.data;
  } catch (error) {
    logger.error("Properties fetch error:", error);
    throw new Error("Failed to fetch properties");
  }
};

export const getPropertyById = async (id: string): Promise<Property> => {
  try {
    const response = await api.get<Property>(endpoints.property(id));
    return response.data;
  } catch (error) {
    logger.error("Property fetch error:", error);
    throw new Error("Failed to fetch property");
  }
};

export const getUserPortfolio = async (
  userId: string
): Promise<PortfolioResponse> => {
  try {
    const response = await api.get<PortfolioResponse>(
      endpoints.portfolio(userId)
    );
    return response.data;
  } catch (error) {
    logger.error("Portfolio fetch error:", error);
    throw new Error("Failed to fetch portfolio data");
  }
};

export const getUserBalance = async (
  userId: string
): Promise<BalanceResponse> => {
  try {
    const response = await api.get<BalanceResponse>(
      endpoints.userBalance(userId)
    );
    return response.data;
  } catch (error) {
    logger.error("Balance fetch error:", error);
    throw new Error("Failed to fetch user balance");
  }
};

export const sendInvestorContact = async (
  formData: ContactFormData
): Promise<ApiResponse> => {
  let retries = 0;

  while (retries <= MAX_RETRIES) {
    try {
      const recaptchaToken = await executeRecaptcha("CONTACT");
      const response = await api.post<ApiResponse>(endpoints.contact, {
        ...formData,
        recaptchaToken,
      });

      logger.log("Contact form submission successful:", response.data);
      return response.data;
    } catch (error) {
      logger.error("Investor contact error:", error);

      if (
        !axios.isAxiosError(error) ||
        !error.response ||
        error.response.status >= 500
      ) {
        if (retries < MAX_RETRIES) {
          retries++;
          await delay(RETRY_DELAY * retries); // Exponential backoff
          continue;
        }
      }

      if (axios.isAxiosError(error) && error.response) {
        const errorData = error.response.data as APIError;
        if (errorData.error === "Alle Felder sind erforderlich") {
          throw new Error("All fields are required");
        } else if (errorData.error === "Fehler beim Senden") {
          throw new Error("Failed to send message. Please try again.");
        }
      }

      handleApiError(error);
    }
  }

  throw new Error("Failed to send message after multiple attempts");
};

export interface Order {
  id: string;
  user_id: string;
  property_id: string;
  side: "buy" | "sell";
  amount: number;
  price: number;
  filled: number;
  status: "open" | "partially_filled" | "filled" | "cancelled";
  created_at: Date;
  updated_at: Date;
  executed_at?: Date;
  executed_price?: number;
  property_name?: string;
  location?: string;
}

export interface CreateOrderRequest {
  property_id: string;
  side: "buy" | "sell";
  amount: number;
  price: number;
}

export interface ExecuteOrderRequest {
  order_id: string;
  execute_price: number;
  execute_amount: number;
}

export interface OrderBookResponse {
  property_id: string;
  bids: Array<{ price: number; total_amount: number; order_count: number }>;
  asks: Array<{ price: number; total_amount: number; order_count: number }>;
}

// Create a new buy/sell order
export const createOrder = async (
  userId: string,
  orderData: CreateOrderRequest
): Promise<{ success: boolean; order_id: number; message: string }> => {
  try {
    const response = await api.post<{
      success: boolean;
      order_id: number;
      message: string;
    }>(`/api/orders/${userId}`, orderData);
    return response.data;
  } catch (error) {
    logger.error("Create order error:", error);
    throw new Error("Failed to create order");
  }
};

// Execute a trade
export const executeTrade = async (
  tradeData: ExecuteOrderRequest
): Promise<{ success: boolean; message: string; trade: any }> => {
  try {
    const response = await api.post<{
      success: boolean;
      message: string;
      trade: any;
    }>("/api/orders/execute", tradeData);
    return response.data;
  } catch (error) {
    logger.error("Execute trade error:", error);
    throw new Error("Failed to execute trade");
  }
};

// Get user's order history
export const getUserOrders = async (userId: string): Promise<Order[]> => {
  try {
    const response = await api.get<{ orders: Order[] }>(
      `/api/orders/${userId}`
    );
    return response.data.orders;
  } catch (error) {
    logger.error("Get user orders error:", error);
    throw new Error("Failed to fetch user orders");
  }
};

// Get order book for a property
export const getOrderBook = async (
  propertyId: string
): Promise<OrderBookResponse> => {
  try {
    const response = await api.get<OrderBookResponse>(
      `/api/orders/property/${propertyId}`
    );
    return response.data;
  } catch (error) {
    logger.error("Get order book error:", error);
    throw new Error("Failed to fetch order book");
  }
};

// Get trade history for a property
export const getPropertyTrades = async (
  propertyId: string
): Promise<{
  trades: Array<{
    id: string;
    amount: number;
    price: number;
    timestamp: string;
    buyer: string;
    seller: string;
  }>;
}> => {
  try {
    const response = await api.get<{
      trades: Array<{
        id: string;
        amount: number;
        price: number;
        timestamp: string;
        buyer: string;
        seller: string;
      }>;
    }>(`/api/orders/property/${propertyId}/trades`);
    return response.data;
  } catch (error) {
    logger.error("Get property trades error:", error);
    throw new Error("Failed to fetch trade history");
  }
};
