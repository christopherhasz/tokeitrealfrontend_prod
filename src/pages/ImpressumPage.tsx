import React, { useEffect, useState } from 'react';
import { Nav } from '../components/Nav';
import { Globe } from 'lucide-react';

export const ImpressumPage: React.FC = () => {
  const [language, setLanguage] = useState<'de' | 'en'>('de');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const content = {
    de: {
      title: 'Impressum',
      legalInfo: 'Angaben gemäß § 5 TMG',
      name: 'Christopher Haß',
      activity: 'Projektinhaber TokeItReal',
      address: '[Postanschrift oder ladungsfähige Adresse – erforderlich nach TMG]',
      email: '[z. B. kontakt@tokeitreal.com]',
      legalStatusTitle: 'Hinweis zum rechtlichen Status',
      legalStatusText: [
        'Bei TokeItReal handelt es sich derzeit nicht um ein Unternehmen im Sinne des Handelsrechts.',
        'Die Website dient ausschließlich der Präsentation und Information über ein in Entwicklung befindliches Konzept.',
        'Es werden keine Finanzdienstleistungen, keine Anlageberatung, kein Verkauf von Finanzinstrumenten und kein öffentliches Angebot von Wertpapieren oder Token im Sinne des Wertpapierprospektgesetzes (WpPG) oder des eWpG vorgenommen.',
        'Alle Inhalte dienen ausschließlich der allgemeinen Information und stellen kein Angebot oder eine Aufforderung zum Erwerb oder zur Veräußerung von Vermögenswerten dar.'
      ],
      disclaimerTitle: 'Haftungsausschluss',
      disclaimerText: [
        'Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte wird jedoch keine Gewähr übernommen.',
        'Verbindliche rechtliche, steuerliche oder finanzielle Beratung findet nicht statt.'
      ],
      copyrightTitle: 'Urheberrecht',
      copyrightText: [
        'Die auf dieser Website veröffentlichten Inhalte, Grafiken und Designs unterliegen dem deutschen Urheberrecht.',
        'Vervielfältigung, Bearbeitung oder Verbreitung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des Erstellers.'
      ],
      privacyTitle: 'Datenschutz',
      privacyText: [
        'Diese Website erhebt und verarbeitet keine personenbezogenen Daten, soweit dies nicht zur technischen Bereitstellung der Seite erforderlich ist.',
        'Es findet keine Analyse, kein Tracking und keine Weitergabe von Daten an Dritte statt.'
      ]
    },
    en: {
      title: 'Legal Notice',
      legalInfo: 'Information according to § 5 TMG',
      name: 'Christopher Haß',
      activity: 'Project Owner TokeItReal',
      address: '[Postal address or legal address – required by TMG]',
      email: '[e.g. kontakt@tokeitreal.com]',
      legalStatusTitle: 'Note on Legal Status',
      legalStatusText: [
        'TokeItReal is currently not a company within the meaning of commercial law.',
        'This website serves exclusively for the presentation and information about a concept under development.',
        'No financial services, investment advice, sale of financial instruments, or public offering of securities or tokens within the meaning of the Securities Prospectus Act (WpPG) or eWpG are provided.',
        'All content serves exclusively for general information and does not constitute an offer or invitation to acquire or dispose of assets.'
      ],
      disclaimerTitle: 'Disclaimer',
      disclaimerText: [
        'The content of this website has been created with the greatest possible care. However, no guarantee is given for the accuracy, completeness and timeliness of the content.',
        'No binding legal, tax or financial advice is provided.'
      ],
      copyrightTitle: 'Copyright',
      copyrightText: [
        'The content, graphics and designs published on this website are subject to German copyright law.',
        'Reproduction, editing or distribution outside the limits of copyright law requires the written consent of the creator.'
      ],
      privacyTitle: 'Data Protection',
      privacyText: [
        'This website does not collect or process personal data unless this is necessary for the technical provision of the site.',
        'No analysis, tracking or sharing of data with third parties takes place.'
      ]
    }
  };

  const currentContent = content[language];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Nav />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        {/* Language Toggle */}
        <div className="flex justify-end mb-8">
          <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setLanguage('de')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-300 ${
                language === 'de'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>Deutsch</span>
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-300 ${
                language === 'en'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>English</span>
            </button>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-gray-100 mb-6">
            {currentContent.title}
          </h1>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none dark:prose-invert">
          {/* Legal Information */}
          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-6">
              {currentContent.legalInfo}
            </h2>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <p className="text-gray-900 dark:text-gray-100 mb-2">
                <strong>{currentContent.name}</strong>
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                {currentContent.activity}
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                {currentContent.address}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                E-Mail: {currentContent.email}
              </p>
            </div>
          </section>

          {/* Legal Status */}
          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-6">
              {currentContent.legalStatusTitle}
            </h2>
            <div className="space-y-4">
              {currentContent.legalStatusText.map((paragraph, index) => (
                <p key={index} className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          {/* Disclaimer */}
          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-6">
              {currentContent.disclaimerTitle}
            </h2>
            <div className="space-y-4">
              {currentContent.disclaimerText.map((paragraph, index) => (
                <p key={index} className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          {/* Copyright */}
          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-6">
              {currentContent.copyrightTitle}
            </h2>
            <div className="space-y-4">
              {currentContent.copyrightText.map((paragraph, index) => (
                <p key={index} className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          {/* Privacy */}
          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-6">
              {currentContent.privacyTitle}
            </h2>
            <div className="space-y-4">
              {currentContent.privacyText.map((paragraph, index) => (
                <p key={index} className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};