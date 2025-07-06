import React, { useState } from 'react';
import { sendInvestorContact } from '../services/api';

export const VentureSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await sendInvestorContact(formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', company: '', message: '' });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to send message. Please try again later.');
      }
      console.error('Investor contact error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 py-24 md:py-32" id="venture">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-gray-100 mb-6">
            For Venture Capital Investors
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Join us in revolutionizing the real estate investment landscape
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="bg-white dark:bg-gray-900 p-12 rounded-2xl shadow-lg">
            <h3 className="text-3xl font-light text-gray-900 dark:text-gray-100 mb-8">Why Invest in TokeItReal?</h3>
            <ul className="space-y-8">
              <li className="flex items-start">
                <span className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 flex items-center justify-center mr-4 mt-1 text-lg font-light">1</span>
                <div>
                  <h4 className="text-xl font-light text-gray-900 dark:text-gray-100 mb-2">Market Potential</h4>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">$280T global real estate market ready for disruption</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 flex items-center justify-center mr-4 mt-1 text-lg font-light">2</span>
                <div>
                  <h4 className="text-xl font-light text-gray-900 dark:text-gray-100 mb-2">Technology</h4>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Proprietary blockchain solution for real estate tokenization</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 flex items-center justify-center mr-4 mt-1 text-lg font-light">3</span>
                <div>
                  <h4 className="text-xl font-light text-gray-900 dark:text-gray-100 mb-2">Traction</h4>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Growing user base and property portfolio</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-900 p-12 rounded-2xl shadow-lg">
            <h3 className="text-3xl font-light text-gray-900 dark:text-gray-100 mb-8">Contact Us</h3>
            {submitted ? (
              <div className="text-center py-12">
                <p className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-2">Thank you for your interest!</p>
                <p className="text-gray-600 dark:text-gray-400">We'll be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-6 py-4 text-lg border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 dark:text-white
                             focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 focus:border-transparent transition-all duration-300"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full px-6 py-4 text-lg border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 dark:text-white
                             focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 focus:border-transparent transition-all duration-300"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Company</label>
                  <input
                    type="text"
                    required
                    className="w-full px-6 py-4 text-lg border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 dark:text-white
                             focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 focus:border-transparent transition-all duration-300"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Message</label>
                  <textarea
                    required
                    rows={4}
                    className="w-full px-6 py-4 text-lg border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 dark:text-white
                             focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 focus:border-transparent transition-all duration-300"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    disabled={loading}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 py-4 rounded-lg text-lg font-light 
                           hover:bg-gray-800 dark:hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl
                           disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
                {error && (
                  <p className="mt-4 text-red-600 dark:text-red-400 text-center">{error}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};