import { LocalStorage, NewsletterSubscriber, VentureContact } from '../types';

const STORAGE_KEY = 'tokeitreal_data';

const getStorageData = (): LocalStorage => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      return {
        newsletterSubscribers: [],
        ventureContacts: []
      };
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return {
      newsletterSubscribers: [],
      ventureContacts: []
    };
  }
};

export const saveNewsletterSubscriber = (email: string): void => {
  try {
    const data = getStorageData();
    data.newsletterSubscribers.push({
      email,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving newsletter subscriber:', error);
  }
};

export const saveVentureContact = (contact: Omit<VentureContact, 'timestamp'>): void => {
  try {
    const data = getStorageData();
    data.ventureContacts.push({
      ...contact,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving venture contact:', error);
  }
};