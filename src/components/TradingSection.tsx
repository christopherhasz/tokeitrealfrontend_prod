import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Building2, BarChart3, ArrowRightLeft, FileText, Users } from 'lucide-react';

export const TradingSection: React.FC = () => {
  // Sample data for the price chart
  const priceData = [
    { month: 'Jan', price: 100 },
    { month: 'Feb', price: 105 },
    { month: 'Mar', price: 103 },
    { month: 'Apr', price: 108 },
    { month: 'May', price: 112 },
    { month: 'Jun', price: 110 },
    { month: 'Jul', price: 115 },
    { month: 'Aug', price: 120 },
    { month: 'Sep', price: 118 },
    { month: 'Oct', price: 125 },
    { month: 'Nov', price: 130 },
    { month: 'Dec', price: 135 },
  ];

  const features = [
    {
      icon: Building2,
      title: 'Property Representation',
      description: 'Each property is represented with comprehensive details including location, financials, and performance metrics.',
    },
    {
      icon: BarChart3,
      title: 'Market-Driven Pricing',
      description: 'Token prices are determined by market supply and demand, reflecting real property value and potential.',
    },
    {
      icon: FileText,
      title: 'Regular Reporting',
      description: 'Detailed monthly reports on property performance, maintenance, and market conditions keep investors informed.',
    },
    {
      icon: ArrowRightLeft,
      title: 'Instant Trading',
      description: 'Trade your tokens 24/7 on our regulated secondary market platform with real-time execution.',
    },
  ];

  // Custom tick formatter for responsive display
  const formatXAxisTick = (tickItem: string, index: number) => {
    // On mobile, show every 3rd month to prevent overlap
    if (window.innerWidth < 768) {
      return index % 3 === 0 ? tickItem : '';
    }
    // On tablet, show every 2nd month
    if (window.innerWidth < 1024) {
      return index % 2 === 0 ? tickItem : '';
    }
    // On desktop, show all months
    return tickItem;
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 dark:text-gray-100 mb-6">
            Trading & Market Dynamics
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Experience a new era of real estate investment with our transparent and liquid marketplace
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-6">
              Property Market Performance
            </h3>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-6 h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart 
                  data={priceData}
                  margin={{ 
                    top: 10, 
                    right: 10, 
                    left: 10, 
                    bottom: 20 
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#6B7280"
                    tick={{ 
                      fill: '#6B7280',
                      fontSize: window.innerWidth < 768 ? 10 : 12
                    }}
                    tickFormatter={formatXAxisTick}
                    interval={0}
                    padding={{ left: 10, right: 10 }}
                    height={40}
                  />
                  <YAxis 
                    stroke="#6B7280"
                    tick={{ 
                      fill: '#6B7280',
                      fontSize: window.innerWidth < 768 ? 10 : 12
                    }}
                    domain={['dataMin - 5', 'dataMax + 5']}
                    width={40}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: 'none',
                      borderRadius: '0.5rem',
                      color: '#F3F4F6',
                      fontSize: '14px'
                    }}
                    labelStyle={{ color: '#F3F4F6' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#000000"
                    strokeWidth={2}
                    dot={{ fill: '#000000', strokeWidth: 2, r: 3 }}
                    activeDot={{ r: 5, fill: '#000000' }}
                    connectNulls
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-6">
              Market Benefits
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <Users className="w-6 h-6 text-black dark:text-white" />
                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100">Increased Accessibility</h4>
                  <p className="text-gray-600 dark:text-gray-400">Start investing with as little as €1</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <ArrowRightLeft className="w-6 h-6 text-black dark:text-white" />
                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100">Enhanced Liquidity</h4>
                  <p className="text-gray-600 dark:text-gray-400">Trade tokens instantly without property sale delays</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <BarChart3 className="w-6 h-6 text-black dark:text-white" />
                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100">Value Appreciation</h4>
                  <p className="text-gray-600 dark:text-gray-400">Benefit from property market growth</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105"
            >
              <feature.icon className="w-12 h-12 text-black dark:text-white mb-4" />
              <h3 className="text-xl font-light text-gray-900 dark:text-gray-100 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};