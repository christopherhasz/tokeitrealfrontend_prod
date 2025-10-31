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
        'The content of this website serves exclusively for general information and presentation of the "TokeItReal" project.',
        'Currently, no financial services, investment advice, asset management or brokerage of financial instruments within the meaning of the Banking Act (KWG), Securities Institute Act (WpIG) or Securities Prospectus Act (WpPG) are offered.',
        'In particular, this website does not constitute an offer to acquire or dispose of securities, tokens, participations or other assets.',
        'All information regarding possible business models, structures or projects is non-binding, not a public offer and serves exclusively for conceptual presentation.',
        'TokeItReal is currently in the development and concept phase.',
        'Legally binding activity will only take place after the establishment of a corresponding company and compliance with all legal licensing and information obligations.',
        'Despite careful content control, we assume no liability for the accuracy, completeness and timeliness of the information presented. Any liability for damages arising directly or indirectly from the use of this website is excluded, unless based on intent or gross negligence.'
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
        'Die Inhalte dieser Website dienen ausschließlich der allgemeinen Information und Präsentation des Projekts „TokeItReal".',
        'Es werden derzeit keine Finanzdienstleistungen, Anlageberatung, Vermögensverwaltung oder Vermittlung von Finanzinstrumenten im Sinne des Kreditwesengesetzes (KWG), Wertpapierinstitutsgesetzes (WpIG) oder Wertpapierprospektgesetzes (WpPG) angeboten.',
        'Insbesondere stellt diese Website kein Angebot zum Erwerb oder zur Veräußerung von Wertpapieren, Token, Beteiligungen oder sonstigen Vermögenswerten dar.',
        'Alle Angaben zu möglichen Geschäftsmodellen, Strukturen oder Projekten sind unverbindlich, nicht öffentliches Angebot und dienen ausschließlich der konzeptionellen Darstellung.',
        'TokeItReal befindet sich derzeit in der Entwicklungs- und Konzeptphase.',
        'Eine rechtlich verbindliche Tätigkeit erfolgt erst nach Gründung einer entsprechenden Gesellschaft und Einhaltung sämtlicher gesetzlicher Zulassungs- und Informationspflichten.',
        'Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Gewähr für Richtigkeit, Vollständigkeit und Aktualität der dargestellten Informationen. Jegliche Haftung für Schäden, die direkt oder indirekt aus der Nutzung dieser Website entstehen, ist ausgeschlossen, soweit sie nicht auf Vorsatz oder grober Fahrlässigkeit beruhen.'
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