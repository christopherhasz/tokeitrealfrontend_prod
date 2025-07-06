export interface NewsletterSubscriber {
  email: string;
  timestamp: string;
}

export interface VentureContact {
  name: string;
  email: string;
  company: string;
  message: string;
  timestamp: string;
}

export interface ThemeContextType {
  isDark: boolean;
  toggleDarkMode: () => void;
}

export interface APIError {
  error: string;
  details?: {
    message: string;
    status: number;
    data?: {
      code: string;
      message: string;
    };
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}

declare global {
  interface Window {
    _paq: any[][];
    grecaptcha: {
      ready: (callback: () => void) => Promise<void>;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}