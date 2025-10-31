import React, { useEffect } from 'react';
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
  // Scroll to top when component mounts (when navigating back from other pages)
  useEffect(() => {
    // Only scroll to top if we're coming from another route
    if (window.location.hash === '' && window.scrollY > 0) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <>
      <Nav showContact={SHOW_CONTACT} />
      <main>
        <section id="home">
          <Hero />
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
                Rechtlicher Hinweis (Disclaimer)
              </h3>
              <div className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed space-y-2 max-w-4xl mx-auto">
                <p>
                  Die Inhalte dieser Website dienen ausschließlich der allgemeinen Information und Präsentation des Projekts „TokeItReal".
                </p>
                <p>
                  Es werden derzeit keine Finanzdienstleistungen, Anlageberatung, Vermögensverwaltung oder Vermittlung von Finanzinstrumenten im Sinne des Kreditwesengesetzes (KWG), Wertpapierinstitutsgesetzes (WpIG) oder Wertpapierprospektgesetzes (WpPG) angeboten.
                </p>
                <p>
                  Insbesondere stellt diese Website kein Angebot zum Erwerb oder zur Veräußerung von Wertpapieren, Token, Beteiligungen oder sonstigen Vermögenswerten dar.
                </p>
                <p>
                  Alle Angaben zu möglichen Geschäftsmodellen, Strukturen oder Projekten sind unverbindlich, nicht öffentliches Angebot und dienen ausschließlich der konzeptionellen Darstellung.
                </p>
                <p>
                  TokeItReal befindet sich derzeit in der Entwicklungs- und Konzeptphase.
                </p>
                <p>
                  Eine rechtlich verbindliche Tätigkeit erfolgt erst nach Gründung einer entsprechenden Gesellschaft und Einhaltung sämtlicher gesetzlicher Zulassungs- und Informationspflichten.
                </p>
                <p>
                  Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Gewähr für Richtigkeit, Vollständigkeit und Aktualität der dargestellten Informationen. Jegliche Haftung für Schäden, die direkt oder indirekt aus der Nutzung dieser Website entstehen, ist ausgeschlossen, soweit sie nicht auf Vorsatz oder grober Fahrlässigkeit beruhen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};