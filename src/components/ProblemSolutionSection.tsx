import React, { useEffect, useRef } from 'react';
import { Lock, Coins, Building, TrendingUp } from 'lucide-react';

interface ProblemSolutionSectionProps {
  language?: 'de' | 'en';
}

export const ProblemSolutionSection: React.FC<ProblemSolutionSectionProps> = ({ language = 'en' }) => {
  const problemsRef = useRef<HTMLDivElement>(null);

  const content = {
    en: {
      problems: [
        'Reserved for professionals and wealthy investors',
        'High entry barriers and transaction costs',
        'Illiquid assets with complex management needs'
      ],
      solutionTitle: "TokeItReal's Solution",
      solutions: [
        {
          title: 'Blockchain Technology',
          description: 'Revolutionizing transaction processes with secure and transparent tokenization'
        },
        {
          title: 'Professional Management',
          description: 'Expert handling of property maintenance and tenant relations'
        },
        {
          title: 'Accessible Investment',
          description: 'Start investing with as little as €1 and trade tokens easily'
        }
      ]
    },
    de: {
      problems: [
        'Reserviert für Profis und wohlhabende Investoren',
        'Hohe Eintrittsbarrieren und Transaktionskosten',
        'Illiquide Vermögenswerte mit komplexen Verwaltungsanforderungen'
      ],
      solutionTitle: 'TokeItReals Lösung',
      solutions: [
        {
          title: 'Blockchain-Technologie',
          description: 'Revolutionierung von Transaktionsprozessen durch sichere und transparente Tokenisierung'
        },
        {
          title: 'Professionelle Verwaltung',
          description: 'Fachkundige Abwicklung von Immobilienwartung und Mieterbeziehungen'
        },
        {
          title: 'Zugängliche Investition',
          description: 'Beginnen Sie mit nur 1 € zu investieren und handeln Sie Token einfach'
        }
      ]
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const problems = entry.target.querySelectorAll('.problem-item');
            problems.forEach((problem, index) => {
              setTimeout(() => {
                problem.classList.remove('translate-y-20', 'opacity-0');
                problem.classList.add('translate-y-0', 'opacity-100');
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

    if (problemsRef.current) {
      observer.observe(problemsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 py-2 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center mb-8 md:mb-12">
          <div className="space-y-8" ref={problemsRef}>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 dark:text-gray-100 leading-tight">
              {language === 'de' ? 'Traditioneller Immobilienmarkt' : 'Traditional Real Estate Market'}
              <span className="block text-red-600 dark:text-red-500 mt-2">{language === 'de' ? 'ist veraltet' : 'is outdated'}</span>
            </h2>
            <div className="space-y-6">
              <div className="problem-item transform transition-all duration-700 ease-out translate-y-20 opacity-0 flex items-start space-x-4">
                <Lock className="w-6 h-6 text-red-600 dark:text-red-500 mt-1" />
                <p className="text-lg text-gray-600 dark:text-gray-400">{content[language].problems[0]}</p>
              </div>
              <div className="problem-item transform transition-all duration-700 ease-out translate-y-20 opacity-0 flex items-start space-x-4">
                <Coins className="w-6 h-6 text-red-600 dark:text-red-500 mt-1" />
                <p className="text-lg text-gray-600 dark:text-gray-400">{content[language].problems[1]}</p>
              </div>
              <div className="problem-item transform transition-all duration-700 ease-out translate-y-20 opacity-0 flex items-start space-x-4">
                <Building className="w-6 h-6 text-red-600 dark:text-red-500 mt-1" />
                <p className="text-lg text-gray-600 dark:text-gray-400">{content[language].problems[2]}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 p-6 md:p-12 rounded-2xl shadow-lg">
            <h3 className="text-2xl md:text-3xl font-light text-gray-900 dark:text-gray-100 mb-4 md:mb-6">
              {content[language].solutionTitle}
            </h3>
            <div className="space-y-3 md:space-y-6">
              {content[language].solutions.map((solution, index) => (
                <div key={index} className="bg-white dark:bg-gray-900 p-4 md:p-6 rounded-xl shadow-sm">
                  <h4 className="text-lg md:text-xl font-medium text-gray-900 dark:text-gray-100 mb-1 md:mb-2">{solution.title}</h4>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">{solution.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};