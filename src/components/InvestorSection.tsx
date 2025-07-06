import React, { useState } from 'react';
import { subscribeToNewsletter } from '../services/api';

export const InvestorSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await subscribeToNewsletter(email);
      setSubmitted(true);
      setEmail('');
    } catch (err) {
      console.error('Newsletter subscription error:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 py-24 md:py-32" id="invest">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div id="newsletter" className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-12 md:p-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-light text-gray-900 dark:text-gray-100 mb-6">
              Stay Updated
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Subscribe to our newsletter to receive updates about new investment opportunities
            </p>
          </div>

          {submitted ? (
            <div className="text-center text-gray-900 dark:text-gray-100">
              <p className="text-2xl font-light mb-2">Thank you for subscribing!</p>
              <p className="text-gray-600 dark:text-gray-400">We'll keep you updated with the latest opportunities.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 text-lg border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 dark:text-white
                           focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 focus:border-transparent transition-all duration-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className={`bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-8 py-4 rounded-lg text-lg font-light 
                           hover:bg-gray-800 dark:hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl
                           disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {loading ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>
              {error && (
                <p className="mt-4 text-red-600 dark:text-red-400 text-center">{error}</p>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};