import React, { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';

interface FeaturesSectionProps {
  showContact?: boolean;
  language?: 'de' | 'en';
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ showContact = false, language = 'en' }) => {
  const featuresRef = useRef<HTMLDivElement>(null);

  const content = {
    en: {
      features: [
        {
          title: 'Secure Investment Platform',
          description: 'State-of-the-art security measures protect your investments and personal data at all times.'
        },
        {
          title: 'Transparent Operations',
          description: 'Full visibility into all transactions and property management activities through our advanced platform.'
        },
        {
          title: 'Expert Support',
          description: 'Dedicated team of real estate and investment professionals available to assist you every step of the way.'
        }
      ],
      ctaTitle: 'Ready to Transform Real Estate Investment?',
      ctaSubtitle: 'Join us in revolutionizing the future of property investment',
      subscribeButton: 'Subscribe to Stay Updated',
      investButton: 'Invest in the Idea'
    },
    de: {
      features: [
        {
          title: 'Sichere Investitionsplattform',
          description: 'Modernste Sicherheitsmaßnahmen schützen Ihre Investitionen und persönlichen Daten jederzeit.'
        },
        {
          title: 'Transparente Abläufe',
          description: 'Vollständige Transparenz über alle Transaktionen und Immobilienverwaltungsaktivitäten durch unsere fortschrittliche Plattform.'
        },
        {
          title: 'Expertenunterstützung',
          description: 'Ein engagiertes Team aus Immobilien- und Investmentexperten steht Ihnen bei jedem Schritt zur Seite.'
        }
      ],
      ctaTitle: 'Bereit, Immobilieninvestitionen zu transformieren?',
      ctaSubtitle: 'Begleiten Sie uns bei der Revolutionierung der Zukunft von Immobilieninvestitionen',
      subscribeButton: 'Abonnieren für Updates',
      investButton: 'In die Idee investieren'
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const features = entry.target.querySelectorAll('.feature-item');
            features.forEach((feature, index) => {
              setTimeout(() => {
                feature.classList.remove('translate-y-20', 'opacity-0');
                feature.classList.add('translate-y-0', 'opacity-100');
              }, index * 200);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left side - Features */}
          <div className="space-y-12" ref={featuresRef}>
            {content[language].features.map((feature, index) => (
              <div key={index} className="feature-item transform transition-all duration-700 ease-out translate-y-20 opacity-0 flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <Check className="h-8 w-8 text-black dark:text-white stroke-[3]" />
                </div>
                <div>
                  <h3 className="text-xl font-light text-gray-900 dark:text-gray-100 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right side - CTA Buttons */}
          {showContact && (
            <div className="space-y-6 md:pl-8">
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-light text-gray-900 dark:text-gray-100 mb-6">
                  {content[language].ctaTitle}
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                  {content[language].ctaSubtitle}
                </p>
              </div>
              <div className="flex flex-col space-y-4">
                <button
                  onClick={() => scrollToSection('newsletter')}
                  className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-lg text-lg font-light
                           transform transition-all duration-300 ease-in-out
                           hover:bg-gray-800 dark:hover:bg-gray-100 hover:scale-105 hover:shadow-lg
                           active:scale-95 w-full md:w-auto"
                >
                  {content[language].subscribeButton}
                </button>
                <button
                  onClick={() => scrollToSection('venture')}
                  className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-lg text-lg font-light
                           transform transition-all duration-300 ease-in-out
                           hover:bg-gray-900 dark:hover:bg-gray-100 hover:scale-105 hover:shadow-xl
                           active:scale-95 w-full md:w-auto"
                >
                  {content[language].investButton}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};