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
      </main>
    </>
  );
};