import React from 'react';
import { TrendingUp } from 'lucide-react';
import { VerticalBarChart } from './VerticalBarChart';

interface StatisticsSectionProps {
  language?: 'de' | 'en';
}

export const StatisticsSection: React.FC<StatisticsSectionProps> = ({ language = 'en' }) => {
  // Real Estate Market data (in trillions)
  const realEstateMarketSize = 164.84; // €164.84T
  const realEstateTransactionVolume = 0.219; // €219B = €0.219T

  // Digital Assets Market data (in trillions)
  const digitalAssetsMarketSize = 0.99; // €990B = €0.99T
  const digitalAssetsTransactionVolume = 1.78; // €1.78T

  const primaryColor = '#000000';
  const secondaryColor = 'rgba(0, 0, 0, 0.5)';

  return (
    <div className="bg-white dark:bg-gray-900 py-16 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-6 md:p-16">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 dark:text-gray-100 mb-4 md:mb-6">
              {language === 'de' ? 'Marktpotenzial' : 'Market Potential'}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {language === 'de'
                ? 'Der traditionelle Immobilienmarkt zeigt erhebliches Potenzial für die Digitalisierung'
                : 'The traditional real estate market shows significant potential for digitalization'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-12 mb-8 md:mb-16">
            {/* Real Estate Market */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 md:p-8 shadow-lg">
              <h3 className="text-xl md:text-2xl font-light text-gray-900 dark:text-gray-100 mb-4 md:mb-8">Real Estate Market</h3>
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 md:gap-8">
                <div className="w-full md:w-auto space-y-4 md:space-y-8">
                  <div>
                    <p className="text-xs md:text-sm mb-1 md:mb-2" style={{ color: primaryColor }}>Market Size in Europe<sup>1</sup></p>
                    <p className="text-2xl md:text-3xl font-light text-gray-900 dark:text-gray-100">€164.84T</p>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm mb-1 md:mb-2" style={{ color: secondaryColor }}>Transaction Volume<sup>2</sup></p>
                    <p className="text-2xl md:text-3xl font-light text-gray-900 dark:text-gray-100">€219B</p>
                    <p className="text-xs md:text-sm text-red-600 dark:text-red-500 mt-1 md:mt-2">Only 0.13% of market size</p>
                  </div>
                </div>
                
                <div className="flex justify-center md:justify-end">
                  <VerticalBarChart
                    marketSize={realEstateMarketSize}
                    transactionVolume={realEstateTransactionVolume}
                    maxValue={200}
                    unit="T"
                  />
                </div>
              </div>
            </div>

            {/* Digital Assets Market */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 md:p-8 shadow-lg">
              <h3 className="text-xl md:text-2xl font-light text-gray-900 dark:text-gray-100 mb-4 md:mb-8">Digital Assets Market</h3>
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 md:gap-8">
                <div className="w-full md:w-auto space-y-4 md:space-y-8">
                  <div>
                    <p className="text-xs md:text-sm mb-1 md:mb-2" style={{ color: primaryColor }}>Market Size in Europe<sup>3</sup></p>
                    <p className="text-2xl md:text-3xl font-light text-gray-900 dark:text-gray-100">€990B</p>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm mb-1 md:mb-2" style={{ color: secondaryColor }}>Transaction Volume<sup>4</sup></p>
                    <p className="text-2xl md:text-3xl font-light text-gray-900 dark:text-gray-100">€1.78T</p>
                    <p className="text-xs md:text-sm text-green-600 dark:text-green-500 mt-1 md:mt-2">180% of market size</p>
                  </div>
                </div>
                
                <div className="flex justify-center md:justify-end">
                  <VerticalBarChart
                    marketSize={digitalAssetsMarketSize}
                    transactionVolume={digitalAssetsTransactionVolume}
                    maxValue={2}
                    unit="T"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Conclusion */}
          <div className="bg-gray-900 dark:bg-black text-white rounded-xl p-6 md:p-12 mb-6 md:mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-8">
              <div className="space-y-2 md:space-y-4">
                <h3 className="text-2xl md:text-3xl font-light">The Opportunity</h3>
                <p className="text-base md:text-lg text-gray-300">
                  By digitizing real estate through tokenization, we can dramatically increase market liquidity and transaction volume, potentially unlocking trillions in value.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-1 md:space-y-2">
                <TrendingUp className="w-12 h-12 md:w-16 md:h-16 text-green-400" />
                <p className="text-lg md:text-xl font-light text-green-400">100x Potential</p>
              </div>
            </div>
          </div>

          {/* Sources */}
          <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400 space-y-1 md:space-y-2 pt-4 md:pt-6 border-t border-gray-200 dark:border-gray-700">
            <p><sup>1</sup> <a href="https://de.statista.com/outlook/fmo/immobilien/europa" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Statista - European Real Estate Market Size</a></p>
            <p><sup>2</sup> <a href="https://www.savills.de/insight-and-opinion/savills-news/367859-0/erholung-auf-dem-europaischen-immobilieninvestmentmarkt-setzt-sich-fort" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Savills - European Real Estate Investment Market</a></p>
            <p><sup>3</sup> <a href="https://bankinghub.de/media/digitale-assets-deutschland-europa" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">BankingHub - Digital Assets in Europe</a></p>
            <p><sup>4</sup> <a href="https://de.statista.com/outlook/fmo/digital-assets/europa" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Statista - European Digital Assets Market</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};