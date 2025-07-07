// Environment configuration
export const config = {
  apiUrl: import.meta.env.VITE_API_URL || "https://api.tokeitreal.com",
  wsUrl: import.meta.env.VITE_WS_URL || "wss://api.tokeitreal.com",
  environment: import.meta.env.VITE_ENV || "production",
  isDevelopment: import.meta.env.VITE_ENV === "development",
  isProduction: import.meta.env.VITE_ENV === "production",
};

// Logging utility that respects environment
export const logger = {
  log: (...args: any[]) => {
    if (config.isDevelopment) {
      console.log("[DEV]", ...args);
    }
  },
  warn: (...args: any[]) => {
    if (config.isDevelopment) {
      console.warn("[DEV]", ...args);
    }
  },
  error: (...args: any[]) => {
    console.error("[ERROR]", ...args);
  },
  info: (...args: any[]) => {
    if (config.isDevelopment) {
      console.info("[DEV]", ...args);
    }
  },
};

// API endpoints configuration
export const endpoints = {
  newsletter: "/api/newsletter/subscribe",
  contact: "/api/contact",
  health: "/api/health",
  orderBook: (propertyId: string) => `/api/market/${propertyId}/orderbook`,
  trades: (propertyId: string) => `/api/market/${propertyId}/trades`,
  orders: "/api/orders",
  pdfDownload: (filename: string) => `/api/pdfs/download/${filename}`,
  websocket: "/ws/market",
};

export const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export default config;
