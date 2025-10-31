import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface HeroProps {
  language?: 'de' | 'en';
  content?: {
    heroTitle1: string;
    heroTitle2: string;
    heroTitle3: string;
    heroSubtitle: string;
    feature1Title: string;
    feature1Description: string;
    feature2Title: string;
    feature2Description: string;
    feature3Title: string;
    feature3Description: string;
  };
}

export const Hero: React.FC<HeroProps> = ({ language = 'en', content }) => {
  const [showLogo, setShowLogo] = useState(false);
  const [showFirstText, setShowFirstText] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const { isDark } = useTheme();

  // Default content if none provided
  const defaultContent = {
    heroTitle1: 'Tokenized',
    heroTitle2: 'rights on',
    heroTitle3: 'Real Estate',
    heroSubtitle: 'Invest in fully managed properties from 1 €',
    feature1Title: 'Holistic Approach for Tokenized Real Estate',
    feature1Description: 'Experience a comprehensive solution that transforms traditional real estate into digital tokens, making property investment more accessible and efficient.',
    feature2Title: 'Buy and Trade Fractions of Real Estate',
    feature2Description: 'Invest in premium properties with minimal capital through fractional ownership, and trade your tokens easily on our secure platform.',
    feature3Title: 'Managed Real Estate by Professionals',
    feature3Description: 'Leave the complexities to us. Our team of experts handles property management, maintenance, and tenant relations while you focus on your investment.'
  };

  const displayContent = content || defaultContent;

  useEffect(() => {
    const logoTimer = setTimeout(() => {
      setShowLogo(true);
    }, 500);

    const firstTextTimer = setTimeout(() => {
      setShowFirstText(true);
    }, 1500);

    const featuresTimer = setTimeout(() => {
      setShowFeatures(true);
    }, 2500);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(firstTextTimer);
      clearTimeout(featuresTimer);
    };
  }, []);

  return (
    <div className="relative bg-white dark:bg-gray-900 pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-32">
        <div className="flex flex-col items-center justify-center text-center space-y-8 md:space-y-8">
          <div
            className={`opacity-0 hero-logo ${showLogo ? 'animate-fade-in' : ''}`}
          >
            <img
              src={isDark ? "/assets/TokeItReal Logo weiß.png" : "/assets/TokeItReal Logo.png"}
              alt="TokeItReal Logo"
              className="w-64 md:w-[30rem]"
            />
          </div>

          <div
            className={`opacity-0 space-y-8 md:space-y-4 ${showFirstText ? 'animate-fade-in' : ''}`}
          >
            <div className="text-3xl md:text-4xl flex flex-col md:flex-row justify-center items-center gap-2">
              <strong className="text-black dark:text-white">{displayContent.heroTitle1}</strong>
              <span className="text-black dark:text-white md:inline">{displayContent.heroTitle2}</span>
              <strong className="text-black dark:text-white">{displayContent.heroTitle3}</strong>
            </div>
            {/* Mobile version - single line with smaller text */}
            <p className="md:hidden text-lg text-gray-500 dark:text-gray-400 font-light whitespace-nowrap">
              {displayContent.heroSubtitle}
            </p>
            {/* Desktop version - original size */}
            <p className="hidden md:block text-xl md:text-2xl text-gray-500 dark:text-gray-400 font-light">
              {displayContent.heroSubtitle}
            </p>
          </div>

          <div
            className={`opacity-0 w-full max-w-7xl mx-auto pt-8 ${showFeatures ? 'animate-fade-in' : ''}`}
          >
            {/* Mobile scrollable container */}
            <div className="md:hidden overflow-x-auto pb-6">
              <div className="flex space-x-2 px-4" style={{ width: 'max-content', paddingRight: 'calc(100vw - 92vw - 16px)' }}>
                <div className="w-[75vw] flex-shrink-0 p-6 border border-gray-200 dark:border-gray-700 rounded-xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm hover:border-gray-300 dark:hover:border-gray-600 transition-colors duration-300">
                  <h3 className="text-xl font-light text-gray-900 dark:text-gray-100 mb-2">
                    {displayContent.feature1Title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {displayContent.feature1Description}
                  </p>
                </div>

                <div className="w-[75vw] flex-shrink-0 p-6 border border-gray-200 dark:border-gray-700 rounded-xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm hover:border-gray-300 dark:hover:border-gray-600 transition-colors duration-300">
                  <h3 className="text-xl font-light text-gray-900 dark:text-gray-100 mb-2">
                    {displayContent.feature2Title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {displayContent.feature2Description}
                  </p>
                </div>

                <div className="w-[75vw] flex-shrink-0 p-6 border border-gray-200 dark:border-gray-700 rounded-xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm hover:border-gray-300 dark:hover:border-gray-600 transition-colors duration-300">
                  <h3 className="text-xl font-light text-gray-900 dark:text-gray-100 mb-2">
                    {displayContent.feature3Title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {displayContent.feature3Description}
                  </p>
                </div>
              </div>
            </div>

            {/* Desktop grid */}
            <div className="hidden md:grid md:grid-cols-3 gap-12">
              <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm hover:border-gray-300 dark:hover:border-gray-600 transition-colors duration-300">
                <h3 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-2 md:mb-3">
                  {displayContent.feature1Title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {displayContent.feature1Description}
                </p>
              </div>

              <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm hover:border-gray-300 dark:hover:border-gray-600 transition-colors duration-300">
                <h3 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-2 md:mb-3">
                  {displayContent.feature2Title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {displayContent.feature2Description}
                </p>
              </div>

              <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm hover:border-gray-300 dark:hover:border-gray-600 transition-colors duration-300">
                <h3 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-2 md:mb-3">
                  {displayContent.feature3Title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {displayContent.feature3Description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};