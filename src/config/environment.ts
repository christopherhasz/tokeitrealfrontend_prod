// Environment configuration
export const config = {
  apiUrl: import.meta.env.VITE_API_URL || "http://localhost:3000",
  wsUrl: import.meta.env.VITE_WS_URL || "ws://localhost:3000",
  environment: import.meta.env.VITE_ENV || "development",
  isDevelopment:
    import.meta.env.VITE_ENV === "development" || !import.meta.env.VITE_ENV,
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
  // Market API endpoints
  orderBook: (propertyId: string) => `/api/orders/property/${propertyId}`,
  trades: (propertyId: string) => `/api/orders/property/${propertyId}/trades`,
  orders: "/api/orders",
  pdfDownload: (filename: string) => `/api/pdfs/download/${filename}`,
  websocket: "/ws/market",
  portfolio: (userId: string) => `/api/portfolio/${userId}`,
  userBalance: (userId: string) => `/api/portfolio/${userId}/balance`,
  properties: "/api/properties",
  property: (id: string) => `/api/properties/${id}`,
};

export const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export default config;
