import React from 'react';
// Fix for missing types for react-plotly.js
// @ts-ignore
import Plot from 'react-plotly.js';
import { Building2, BarChart3, ArrowRightLeft, FileText, Users } from 'lucide-react';

interface TradingSectionProps {
  language?: 'de' | 'en';
}

export const TradingSection: React.FC<TradingSectionProps> = ({ language = 'en' }) => {
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

  const content = {
    en: {
      features: [
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
      ]
    },
    de: {
      features: [
        {
          icon: Building2,
          title: 'Immobiliendarstellung',
          description: 'Jede Immobilie wird mit umfassenden Details dargestellt, einschließlich Standort, Finanzen und Leistungskennzahlen.',
        },
        {
          icon: BarChart3,
          title: 'Marktgesteuerte Preisbildung',
          description: 'Token-Preise werden durch Marktangebot und -nachfrage bestimmt und spiegeln den realen Immobilienwert und das Potenzial wider.',
        },
        {
          icon: FileText,
          title: 'Regelmäßige Berichterstattung',
          description: 'Detaillierte monatliche Berichte über Immobilienleistung, Wartung und Marktbedingungen halten Investoren auf dem Laufenden.',
        },
        {
          icon: ArrowRightLeft,
          title: 'Sofortiger Handel',
          description: 'Handeln Sie Ihre Token 24/7 auf unserer regulierten Sekundärmarktplattform mit Echtzeitausführung.',
        },
      ]
    }
  };

  const features = content[language].features;

  // Prepare data for plotly.js
  const plotlyData = [
    {
      x: priceData.map(item => item.month),
      y: priceData.map(item => item.price),
      type: 'scatter',
      mode: 'lines+markers',
      line: {
        color: '#000000',
        width: 3
      },
      marker: {
        color: '#000000',
        size: 6
      },
      name: 'Property Value',
      hovertemplate: '<b>%{x}</b><br>Value: €%{y}<extra></extra>'
    }
  ];

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 dark:text-gray-100 mb-6">
            {language === 'de' ? 'Handel & Marktdynamik' : 'Trading & Market Dynamics'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {language === 'de'
              ? 'Erleben Sie eine neue Ära der Immobilieninvestition mit unserem transparenten und liquiden Marktplatz'
              : 'Experience a new era of real estate investment with our transparent and liquid marketplace'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-6">
              Property Market Performance
            </h3>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-6 h-[300px]">
              <Plot
                data={plotlyData}
                layout={{
                  autosize: true,
                  height: 260,
                  margin: { l: 50, r: 20, t: 20, b: 40 },
                  paper_bgcolor: 'rgba(0,0,0,0)',
                  plot_bgcolor: 'rgba(0,0,0,0)',
                  xaxis: {
                    title: '',
                    color: '#6B7280',
                    gridcolor: '#374151',
                    showgrid: true,
                    zeroline: false,
                    tickfont: {
                      size: window.innerWidth < 768 ? 10 : 12,
                      color: '#6B7280'
                    }
                  },
                  yaxis: {
                    title: '',
                    color: '#6B7280',
                    gridcolor: '#374151',
                    showgrid: true,
                    zeroline: false,
                    tickfont: {
                      size: window.innerWidth < 768 ? 10 : 12,
                      color: '#6B7280'
                    },
                    tickformat: '€,.0f'
                  },
                  font: { 
                    color: '#6B7280',
                    family: 'system-ui, -apple-system, sans-serif'
                  },
                  showlegend: false,
                  hovermode: 'closest'
                }}
                config={{ 
                  displayModeBar: false, 
                  responsive: true,
                  staticPlot: false
                }}
                style={{ width: '100%', height: '100%' }}
              />
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