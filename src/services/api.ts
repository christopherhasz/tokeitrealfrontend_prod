import axios from 'axios';
import { config, endpoints, logger } from '../config/environment';
import { APIError, ApiResponse } from '../types';

const API_URL = config.apiUrl;
const RECAPTCHA_SITE_KEY = '6LeqeSUrAAAAAPHkkwK9SsGZYZlfNNZG_lXLeBMC';
const MAX_RETRIES = 2;
const RETRY_DELAY = 1000;

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const executeRecaptcha = async (action: string): Promise<string> => {
  try {
    await new Promise<void>((resolve) => {
      window.grecaptcha.ready(() => resolve());
    });
    
    const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action });
    return token;
  } catch (error) {
    console.error('reCAPTCHA error:', error);
    throw new Error('Failed to verify reCAPTCHA. Please try again.');
  }
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const handleApiError = (error: unknown): never => {
  if (axios.isAxiosError(error) && error.response) {
    const errorData = error.response.data as APIError;
    const statusCode = error.response.status;
    
    logger.error('API Error:', { statusCode, errorData, url: error.config?.url });

    if (statusCode === 400) {
      if (errorData.error === "E-Mail ist erforderlich") {
        throw new Error("Email is required");
      } else if (errorData.error === "Diese E-Mail-Adresse ist bereits angemeldet") {
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

export const subscribeToNewsletter = async (email: string): Promise<ApiResponse> => {
  let retries = 0;

  while (retries <= MAX_RETRIES) {
    try {
      const recaptchaToken = await executeRecaptcha('NEWSLETTER');
      const response = await api.post<ApiResponse>(endpoints.newsletter, { 
        email,
        recaptchaToken 
      });
      
      logger.log('Newsletter subscription successful:', response.data);
      return response.data;
    } catch (error) {
      logger.error('Newsletter subscription error:', error);

      if (!axios.isAxiosError(error) || !error.response || error.response.status >= 500) {
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

export const sendInvestorContact = async (formData: ContactFormData): Promise<ApiResponse> => {
  let retries = 0;

  while (retries <= MAX_RETRIES) {
    try {
      const recaptchaToken = await executeRecaptcha('CONTACT');
      const response = await api.post<ApiResponse>(endpoints.contact, {
        ...formData,
        recaptchaToken
      });
      
      logger.log('Contact form submission successful:', response.data);
      return response.data;
    } catch (error) {
      logger.error('Investor contact error:', error);

      if (!axios.isAxiosError(error) || !error.response || error.response.status >= 500) {
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