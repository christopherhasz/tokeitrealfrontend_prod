import React, { useState } from 'react';
import { Building2, Wallet, BarChart3, ArrowRightLeft, ChevronDown, Search } from 'lucide-react';

interface HolisticApproachSectionProps {
  language?: 'de' | 'en';
}

export const HolisticApproachSection: React.FC<HolisticApproachSectionProps> = ({ language = 'en' }) => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const toggleCard = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const content = {
    en: {
      steps: [
        {
          icon: Search,
          title: 'Property Identification',
          summary: 'Selecting high-yield properties through thorough due diligence',
          description: 'Before the start of the tokenization, TokeItReal ',
          boldText: 'selects high-yield properties',
          descriptionEnd: ' (e.g., residential or commercial properties). The selection is based on a thorough due diligence with defined criteria such as location, rental yield (e.g., 4–6% p.a.), and potential for value appreciation, determined through analyses by a dedicated team led by the board, possibly with input from external experts.'
        },
        {
          icon: BarChart3,
          title: 'Platform Listing',
          summary: 'Presenting properties on our digital platform with minimum €1 investment',
          descriptionStart: 'The selected property is presented on the ',
          boldText1: 'digital platform',
          descriptionMiddle: ', including detailed information (e.g., location, rental income, photos, appraisals). Investors can participate with a ',
          boldText2: 'minimum investment of 1 €',
          descriptionEnd: ' per token, with each profit participation certificate.'
        },
        {
          icon: Wallet,
          title: 'Capital Raising',
          summary: 'Secure escrow collection of investor funds for property purchase',
          description: 'The capital is deposited into an escrow account (e.g., managed by a notary or bank), to which TokeItReal has access solely for the ',
          boldText: 'property purchase',
          descriptionEnd: '. The funds are collected within a set timeframe, and the target volume of the series must be reached to complete the purchase; otherwise, the capital is refunded.'
        },
        {
          icon: Building2,
          title: 'Purchase and Management',
          summary: 'Acquiring properties and providing full management services',
          descriptionStart: 'Upon successful capital raising, TokeItReal ',
          boldText1: 'acquires the property and takes over its management ',
          descriptionMiddle: '(e.g. maintenance, tenant relations). Investors in the respective series ',
          boldText2: 'receive 100% of the net rental income ',
          descriptionEnd: ', after deducting costs related to the operation and maintenance of the property (e.g., non-allocable operating costs, necessary renovations), as well as 100% of the proceeds from a potential future sale of the property, proportional to their tokens.'
        },
        {
          icon: ArrowRightLeft,
          title: 'Trading and Representation',
          summary: 'Enabling token trading on regulated secondary markets',
          descriptionStart: 'After the purchase, TokeItReal ensures the property is represented on the sales platform to enable trading of the tokenized assets on a regulated secondary market. TokeItReal markets the property, regularly documents its condition (e.g., through reports on rental income and value development), and provides this information to investors ',
          boldText1: 'to ensure transparency ',
          descriptionMiddle: 'and an informed trading basis. The price of the tokenized profit participation certificates can fluctuate based on supply and demand, as in ',
          boldText2: 'a free market',
          descriptionEnd: ', allowing investors to directly benefit from the property\'s value appreciation. The tokens of the profit participation certificates are tradable at any time, with liquidity depending on market demand, offering investors flexibility to sell or hold them.'
        }
      ]
    },
    de: {
      steps: [
        {
          icon: Search,
          title: 'Immobilien-auswahl',
          summary: 'Auswahl ertragsstarker Immobilien durch gründliche Due Diligence',
          description: 'Vor Beginn der Tokenisierung ',
          boldText: 'wählt TokeItReal ertragsstarke Immobilien aus',
          descriptionEnd: ' (z.B. Wohn- oder Gewerbeimmobilien). Die Auswahl basiert auf einer gründlichen Due Diligence mit definierten Kriterien wie Lage, Mietrendite (z.B. 4–6% p.a.) und Wertsteigerungspotenzial, ermittelt durch Analysen eines dedizierten Teams unter Leitung des Vorstands, ggf. unter Einbeziehung externer Experten.'
        },
        {
          icon: BarChart3,
          title: 'Plattform-Listung',
          summary: 'Präsentation von Immobilien auf unserer digitalen Plattform mit Mindestinvestition von 1 €',
          descriptionStart: 'Die ausgewählte Immobilie wird auf der ',
          boldText1: 'digitalen Plattform',
          descriptionMiddle: ' präsentiert, einschließlich detaillierter Informationen (z.B. Lage, Mieteinnahmen, Fotos, Gutachten). Investoren können mit einer ',
          boldText2: 'Mindestinvestition von 1 €',
          descriptionEnd: ' pro Token teilnehmen, mit jedem Gewinnbeteiligungszertifikat.'
        },
        {
          icon: Wallet,
          title: 'Kapitalbeschaffung',
          summary: 'Sichere Treuhand-Sammlung von Investorengeldern für den Immobilienkauf',
          description: 'Das Kapital wird auf ein Treuhandkonto (z.B. verwaltet von einem Notar oder einer Bank) eingezahlt, auf das TokeItReal ausschließlich für den ',
          boldText: 'Immobilienkauf',
          descriptionEnd: ' Zugriff hat. Die Mittel werden innerhalb eines festgelegten Zeitrahmens gesammelt, und das Zielvolumen der Serie muss erreicht werden, um den Kauf abzuschließen; andernfalls wird das Kapital zurückerstattet.'
        },
        {
          icon: Building2,
          title: 'Kauf und Verwaltung',
          summary: 'Immobilienerwerb und Bereitstellung vollständiger Verwaltungsdienstleistungen',
          descriptionStart: 'Nach erfolgreicher Kapitalbeschaffung ',
          boldText1: 'erwirbt TokeItReal die Immobilie und übernimmt deren Verwaltung ',
          descriptionMiddle: '(z.B. Instandhaltung, Mieterbeziehungen). Investoren der jeweiligen Serie ',
          boldText2: 'erhalten 100% der Nettomieteinnahmen ',
          descriptionEnd: ', nach Abzug der Kosten für Betrieb und Instandhaltung der Immobilie (z.B. nicht umlagefähige Betriebskosten, notwendige Renovierungen), sowie 100% der Erlöse aus einem möglichen zukünftigen Verkauf der Immobilie, proportional zu ihren Token.'
        },
        {
          icon: ArrowRightLeft,
          title: 'Handel und Repräsentation',
          summary: 'Ermöglichung des Token-Handels auf regulierten Sekundärmärkten',
          descriptionStart: 'Nach dem Kauf stellt TokeItReal sicher, dass die Immobilie auf der Verkaufsplattform repräsentiert ist, um den Handel der tokenisierten Vermögenswerte auf einem regulierten Sekundärmarkt zu ermöglichen. TokeItReal vermarktet die Immobilie, dokumentiert regelmäßig ihren Zustand (z.B. durch Berichte über Mieteinnahmen und Wertentwicklung) und stellt diese Informationen den Investoren zur Verfügung, ',
          boldText1: 'um Transparenz zu gewährleisten ',
          descriptionMiddle: 'und eine informierte Handelsbasis zu schaffen. Der Preis der tokenisierten Gewinnbeteiligungszertifikate kann aufgrund von Angebot und Nachfrage schwanken, wie in ',
          boldText2: 'einem freien Markt',
          descriptionEnd: ', sodass Investoren direkt von der Wertsteigerung der Immobilie profitieren können. Die Token der Gewinnbeteiligungszertifikate sind jederzeit handelbar, wobei die Liquidität von der Marktnachfrage abhängt und den Investoren Flexibilität beim Verkauf oder Halten bietet.'
        }
      ]
    }
  };

  const steps = content[language].steps;

  return (
    <div className="bg-white dark:bg-gray-900 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 dark:text-gray-100 mb-6">
            {language === 'de' ? 'Unser ganzheitlicher Ansatz' : 'Our Holistic Approach'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {language === 'de'
              ? 'Von der Immobilienidentifizierung bis zur aktiven Verwaltung k\u00fcmmern wir uns um jeden Aspekt der Immobilientokenisierung'
              : 'From property identification to active management, we handle every aspect of real estate tokenization'}
          </p>
        </div>

        <div className="space-y-8">
          <div className="relative grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
            {/* Connecting Lines with Arrows - only visible on large screens */}
            <div className="absolute inset-0 hidden lg:block">
              <svg className="w-full h-full" style={{ position: 'absolute', zIndex: 0, top: '80px' }}>
                {/* First connecting line with arrow */}
                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="10"
                    markerHeight="7"
                    refX="9"
                    refY="3.5"
                    orient="auto"
                  >
                    <polygon
                      points="0 0, 10 3.5, 0 7"
                      className="fill-gray-300 dark:fill-gray-700"
                    />
                  </marker>
                </defs>
                <line
                  x1="20%"
                  y1="0"
                  x2="38%"
                  y2="0"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-gray-300 dark:text-gray-700"
                  markerEnd="url(#arrowhead)"
                />
                <line
                  x1="40%"
                  y1="0"
                  x2="58%"
                  y2="0"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-gray-300 dark:text-gray-700"
                  markerEnd="url(#arrowhead)"
                />
                <line
                  x1="60%"
                  y1="0"
                  x2="78%"
                  y2="0"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-gray-300 dark:text-gray-700"
                  markerEnd="url(#arrowhead)"
                />
                <line
                  x1="80%"
                  y1="0"
                  x2="98%"
                  y2="0"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-gray-300 dark:text-gray-700"
                  markerEnd="url(#arrowhead)"
                />
              </svg>
            </div>

            {steps.map((step, index) => (
              <div
                key={step.title}
                className={`relative z-10 lg:min-h-[320px] bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden
                           ${index === 4 ? 'col-span-2 sm:col-span-1' : ''}`}
              >
                <div
                  className="p-3 sm:p-4 lg:p-8 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200 h-full flex flex-col items-center"
                  onClick={() => toggleCard(index)}
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-lg overflow-hidden mb-2 sm:mb-3 lg:mb-4">
                    <step.icon className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-gray-900 dark:text-white" />
                  </div>

                  <div className="text-center mb-2 lg:mb-4">
                    <h3 className="text-sm sm:text-lg lg:text-2xl font-light text-gray-900 dark:text-gray-100 leading-tight mb-1 sm:mb-2 break-words hyphens-auto" lang={language}>
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm lg:text-base text-gray-500 dark:text-gray-400 leading-tight px-1">
                      {step.summary}
                    </p>
                  </div>

                  {/* Mobile/Tablet arrow */}
                  <ChevronDown
                    className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-400 transition-transform duration-300 ${
                      expandedCard === index ? 'rotate-180' : ''
                    }`}
                  />

                  {/* Mobile/Tablet expanded content */}
                  <div
                    className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden text-center mt-2 ${
                      expandedCard === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed px-1">
                      {index === 0 ? (
                        <>
                          {step.description}
                          <strong className="text-gray-900 dark:text-gray-100">{step.boldText}</strong>
                          {step.descriptionEnd}
                        </>
                      ) : index === 1 ? (
                        <>
                          {step.descriptionStart}
                          <strong className="text-gray-900 dark:text-gray-100">{step.boldText1}</strong>
                          {step.descriptionMiddle}
                          <strong className="text-gray-900 dark:text-gray-100">{step.boldText2}</strong>
                          {step.descriptionEnd}
                        </>
                      ) : index === 2 ? (
                        <>
                          {step.description}
                          <strong className="text-gray-900 dark:text-gray-100">{step.boldText}</strong>
                          {step.descriptionEnd}
                        </>
                      ) : index === 3 ? (
                        <>
                          {step.descriptionStart}
                          <strong className="text-gray-900 dark:text-gray-100">{step.boldText1}</strong>
                          {step.descriptionMiddle}
                          <strong className="text-gray-900 dark:text-gray-100">{step.boldText2}</strong>
                          {step.descriptionEnd}
                        </>
                      ) : (
                        <>
                          {step.descriptionStart}
                          <strong className="text-gray-900 dark:text-gray-100">{step.boldText1}</strong>
                          {step.descriptionMiddle}
                          <strong className="text-gray-900 dark:text-gray-100">{step.boldText2}</strong>
                          {step.descriptionEnd}
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop expanded content */}
          <div className="hidden lg:block">
            {expandedCard !== null && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transition-all duration-300 ease-in-out">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-4xl mx-auto">
                  {expandedCard === 0 ? (
                    <>
                      {steps[0].description}
                      <strong className="text-gray-900 dark:text-gray-100">{steps[0].boldText}</strong>
                      {steps[0].descriptionEnd}
                    </>
                  ) : expandedCard === 1 ? (
                    <>
                      {steps[1].descriptionStart}
                      <strong className="text-gray-900 dark:text-gray-100">{steps[1].boldText1}</strong>
                      {steps[1].descriptionMiddle}
                      <strong className="text-gray-900 dark:text-gray-100">{steps[1].boldText2}</strong>
                      {steps[1].descriptionEnd}
                    </>
                  ) : expandedCard === 2 ? (
                    <>
                      {steps[2].description}
                      <strong className="text-gray-900 dark:text-gray-100">{steps[2].boldText}</strong>
                      {steps[2].descriptionEnd}
                    </>
                  ) : expandedCard === 3 ? (
                    <>
                      {steps[3].descriptionStart}
                      <strong className="text-gray-900 dark:text-gray-100">{steps[3].boldText1}</strong>
                      {steps[3].descriptionMiddle}
                      <strong className="text-gray-900 dark:text-gray-100">{steps[3].boldText2}</strong>
                      {steps[3].descriptionEnd}
                    </>
                  ) : (
                    <>
                      {steps[4].descriptionStart}
                      <strong className="text-gray-900 dark:text-gray-100">{steps[4].boldText1}</strong>
                      {steps[4].descriptionMiddle}
                      <strong className="text-gray-900 dark:text-gray-100">{steps[4].boldText2}</strong>
                      {steps[4].descriptionEnd}
                    </>
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};