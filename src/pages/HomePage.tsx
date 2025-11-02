import React, { useEffect } from 'react';
import { useState } from 'react';
import { Globe } from 'lucide-react';
import { Nav } from '../components/Nav';
import { Hero } from '../components/Hero';
import { HolisticApproachSection } from '../components/HolisticApproachSection';
import { FeaturesSection } from '../components/FeaturesSection';
import { ProblemSolutionSection } from '../components/ProblemSolutionSection';
import { StatisticsSection } from '../components/StatisticsSection';
import { TradingSection } from '../components/TradingSection';
import { ManagementSection } from '../components/ManagementSection';
import { VentureSection } from '../components/VentureSection';
import { InvestorSection } from '../components/InvestorSection';
import { LinkedInContact } from '../components/LinkedInContact';

const SHOW_CONTACT = false; // Toggle this to show/hide contact sections

export const HomePage: React.FC = () => {
  const [language, setLanguage] = useState<'de' | 'en'>('en');

  // Scroll to top when component mounts (when navigating back from other pages)
  useEffect(() => {
    // Only scroll to top if we're coming from another route
    if (window.location.hash === '' && window.scrollY > 0) {
      window.scrollTo(0, 0);
    }
  }, []);

  const content = {
    en: {
      legalTitle: 'Legal Notice (Disclaimer)',
      legalText: [
        'The website tokeitreal.com is operated by TokeItReal GbR, represented by the partners Christopher Haß and Felix Behnke.',
        'The company is currently in the development and concept phase.',
        'The information provided on this website serves exclusively for the general presentation of the "TokeItReal" project and the introduction of the underlying concept for digitization and tokenization of real estate values.',
        'Currently, no financial services, investment advice, brokerage of financial instruments, asset management, or offers for the acquisition or disposal of securities, tokens, or other assets within the meaning of the Banking Act (KWG), Securities Institute Act (WpIG), Electronic Securities Act (eWpG), or Securities Prospectus Act (WpPG) are provided.',
        'All descriptions, representations, and illustrations contained on this website are non-binding and do not constitute legal or financial recommendations or calls to action.',
        'They serve exclusively for informational purposes about the planned business development of TokeItReal GbR.',
        'TokeItReal GbR assumes no responsibility for the accuracy, completeness, or timeliness of the information provided. Any liability for material or immaterial damages arising from the use or non-use of the information offered is excluded, unless there is proven intentional or grossly negligent fault.',
        'The company expressly reserves the right to change, supplement, delete parts of the pages or the entire offering without separate notice, or to discontinue publication temporarily or permanently.'
      ],
      // Hero Section
      heroTitle1: 'Tokenized',
      heroTitle2: 'rights on',
      heroTitle3: 'Real Estate',
      heroSubtitle: 'Invest in fully managed properties from 1 €',
      // Features
      feature1Title: 'Holistic Approach for Tokenized Real Estate',
      feature1Description: 'Experience a comprehensive solution that transforms traditional real estate into digital tokens, making property investment more accessible and efficient.',
      feature2Title: 'Buy and Trade Fractions of Real Estate',
      feature2Description: 'Invest in premium properties with minimal capital through fractional ownership, and trade your tokens easily on our secure platform.',
      feature3Title: 'Managed Real Estate by Professionals',
      feature3Description: 'Leave the complexities to us. Our team of experts handles property management, maintenance, and tenant relations while you focus on your investment.'
    },
    de: {
      legalTitle: 'Rechtlicher Hinweis (Disclaimer)',
      legalText: [
        'Die Website tokeitreal.com wird von der TokeItReal GbR, vertreten durch die Gesellschafter Christopher Haß und Felix Behnke, betrieben.',
        'Die Gesellschaft befindet sich derzeit in der Entwicklungs- und Konzeptphase.',
        'Die auf dieser Website bereitgestellten Informationen dienen ausschließlich der allgemeinen Darstellung des Projekts „TokeItReal" sowie der Vorstellung des zugrunde liegenden Konzepts zur Digitalisierung und Tokenisierung von Immobilienwerten.',
        'Es werden derzeit keine Finanzdienstleistungen, keine Anlageberatung, keine Vermittlung von Finanzinstrumenten, keine Verwaltung von Vermögenswerten und keine Angebote zum Erwerb oder zur Veräußerung von Wertpapieren, Token oder sonstigen Vermögenswerten im Sinne des Kreditwesengesetzes (KWG), Wertpapierinstitutsgesetzes (WpIG), elektronischen Wertpapiergesetzes (eWpG) oder Wertpapierprospektgesetzes (WpPG) erbracht.',
        'Alle auf dieser Website enthaltenen Beschreibungen, Darstellungen und Abbildungen sind unverbindlich und stellen weder eine rechtliche noch eine finanzielle Empfehlung oder Aufforderung zum Tätigwerden dar.',
        'Sie dienen ausschließlich dem Informationszweck über die geplante Unternehmensentwicklung der TokeItReal GbR.',
        'Die TokeItReal GbR übernimmt keine Gewähr für die Richtigkeit, Vollständigkeit oder Aktualität der bereitgestellten Informationen. Jegliche Haftung für Schäden materieller oder immaterieller Art, die durch die Nutzung oder Nichtnutzung der angebotenen Informationen entstehen, ist ausgeschlossen, soweit kein nachweislich vorsätzliches oder grob fahrlässiges Verschulden vorliegt.',
        'Die Gesellschaft behält sich ausdrücklich vor, Teile der Seiten oder das gesamte Angebot ohne gesonderte Ankündigung zu verändern, zu ergänzen, zu löschen oder die Veröffentlichung zeitweise oder endgültig einzustellen.'
      ],
      // Hero Section
      heroTitle1: 'Tokenisierte',
      heroTitle2: 'Rechte an',
      heroTitle3: 'Immobilien',
      heroSubtitle: 'Investieren Sie in vollständig verwaltete Immobilien ab 1 €',
      // Features
      feature1Title: 'Ganzheitlicher Ansatz für tokenisierte Immobilien',
      feature1Description: 'Erleben Sie eine umfassende Lösung, die traditionelle Immobilien in digitale Token verwandelt und Immobilieninvestitionen zugänglicher und effizienter macht.',
      feature2Title: 'Kaufen und handeln Sie Immobilienanteile',
      feature2Description: 'Investieren Sie mit minimalem Kapital in Premium-Immobilien durch Bruchteilseigentum und handeln Sie Ihre Token einfach auf unserer sicheren Plattform.',
      feature3Title: 'Professionell verwaltete Immobilien',
      feature3Description: 'Überlassen Sie uns die Komplexität. Unser Expertenteam kümmert sich um Immobilienverwaltung, Wartung und Mieterbeziehungen, während Sie sich auf Ihre Investition konzentrieren.'
    }
  };

  const currentContent = content[language];

  return (
    <>
      <Nav showContact={SHOW_CONTACT} />
      <main>
        {/* Language Toggle - Fixed Position */}
        <div className="fixed top-24 right-4 z-40">
          <div className="flex items-center space-x-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-lg p-1 shadow-lg border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setLanguage('en')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-all duration-300 text-sm ${
                language === 'en'
                  ? 'bg-black dark:bg-white text-white dark:text-black shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <Globe className="w-3 h-3" />
              <span>EN</span>
            </button>
            <button
              onClick={() => setLanguage('de')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-all duration-300 text-sm ${
                language === 'de'
                  ? 'bg-black dark:bg-white text-white dark:text-black shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <Globe className="w-3 h-3" />
              <span>DE</span>
            </button>
          </div>
        </div>

        <section id="home">
          <Hero language={language} content={currentContent} />
          <HolisticApproachSection />
          <TradingSection />
          <ManagementSection />
          <ProblemSolutionSection />
          <StatisticsSection />
          <FeaturesSection showContact={SHOW_CONTACT} />
        </section>
        {SHOW_CONTACT && (
          <>
            <section id="invest">
              <InvestorSection />
            </section>
            <section id="venture">
              <VentureSection />
            </section>
          </>
        )}
        <LinkedInContact />
        
        {/* Legal Disclaimer */}
        <div className="bg-gray-50 dark:bg-gray-800 py-8 border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4">
                {currentContent.legalTitle}
              </h3>
              <div className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed space-y-2 max-w-4xl mx-auto">
                {currentContent.legalText.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};