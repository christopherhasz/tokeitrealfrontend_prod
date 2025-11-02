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
      companyInfo: {
        name: 'TokeItReal GbR',
        representatives: 'vertreten durch den Gesellschafter',
        founders: 'Christopher Haß',
        address: 'Waldstraße 21',
        city: '15345 Altlandsberg',
        country: 'Deutschland',
        email: 'info@tokeitreal.com',
        web: 'tokeitreal.com'
      },
      representationTitle: 'Vertretung',
      representationText: 'Jeder Gesellschafter ist einzeln vertretungsberechtigt (§ 714 BGB).',
      companyFormTitle: 'Gesellschaftsform',
      companyFormText: [
        'Die TokeItReal GbR ist eine Gesellschaft bürgerlichen Rechts nach §§ 705 ff. BGB.',
        'Sitz der Gesellschaft ist Berlin.'
      ],
      activityStatusTitle: 'Hinweis zum Tätigkeitsstatus',
      activityStatusText: [
        'Die TokeItReal GbR befindet sich derzeit in der konzeptionellen Entwicklungsphase.',
        'Über diese Website werden keine Finanzdienstleistungen, keine Anlageberatung und keine Angebote zum Erwerb von Finanzinstrumenten oder Token im Sinne des Kreditwesengesetzes (KWG), Wertpapierinstitutsgesetzes (WpIG), Wertpapierprospektgesetzes (WpPG) oder elektronischen Wertpapiergesetzes (eWpG) erbracht.',
        'Alle dargestellten Inhalte dienen ausschließlich der Präsentation des Projekts und stellen kein Angebot im rechtlichen Sinne dar.'
      ],
      disclaimerTitle: 'Haftungsausschluss',
      disclaimerText: [
        'Die Inhalte dieser Website werden mit größter Sorgfalt erstellt. Eine Gewähr für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte wird jedoch nicht übernommen.',
        'Die TokeItReal GbR haftet nicht für Schäden, die direkt oder indirekt aus der Nutzung der Website entstehen, es sei denn, diese beruhen auf Vorsatz oder grober Fahrlässigkeit.'
      ],
      copyrightTitle: 'Urheberrecht',
      copyrightText: [
        'Alle auf dieser Website veröffentlichten Inhalte, Designs, Logos und Konzepte sind urheberrechtlich geschützt.',
        'Jede Verwertung außerhalb der Grenzen des Urheberrechts bedarf der schriftlichen Zustimmung der TokeItReal GbR.'
      ],
      privacyTitle: 'Datenschutz',
      privacyText: [
        'Diese Website erhebt und verarbeitet keine personenbezogenen Daten, soweit dies nicht zur technischen Bereitstellung der Seite erforderlich ist.',
        'Es findet keine Analyse, kein Tracking und keine Weitergabe von Daten an Dritte statt.',
        'Weitere Informationen findest du in unserer Datenschutzerklärung.'
      ],
      responsibilityTitle: 'Verantwortlich für den Inhalt (§ 55 Abs. 2 RStV)',
      responsibilityText: 'Christopher Haß und Felix Behnke unter der oben angegebenen Anschrift'
    },
    en: {
      title: 'Legal Notice',
      legalInfo: 'Information according to § 5 TMG',
      companyInfo: {
        name: 'TokeItReal GbR',
        representatives: 'represented by the partners',
        founders: 'Christopher Haß & Felix Behnke',
        address: '[Street, House Number]',
        city: '[Postal Code, City – expected Berlin]',
        country: 'Germany',
        email: 'kontakt@tokeitreal.com',
        web: 'tokeitreal.com'
      },
      representationTitle: 'Representation',
      representationText: 'Each partner is individually authorized to represent (§ 714 BGB).',
      companyFormTitle: 'Company Form',
      companyFormText: [
        'TokeItReal GbR is a civil law partnership according to §§ 705 ff. BGB.',
        'The registered office of the company is Berlin.'
      ],
      activityStatusTitle: 'Note on Activity Status',
      activityStatusText: [
        'TokeItReal GbR is currently in the conceptual development phase.',
        'No financial services, investment advice, or offers for the acquisition of financial instruments or tokens within the meaning of the Banking Act (KWG), Securities Institute Act (WpIG), Securities Prospectus Act (WpPG), or Electronic Securities Act (eWpG) are provided through this website.',
        'All content presented serves exclusively for project presentation and does not constitute a legal offer.'
      ],
      disclaimerTitle: 'Disclaimer',
      disclaimerText: [
        'The content of this website is created with the greatest care. However, no guarantee is given for the accuracy, completeness and timeliness of the content.',
        'TokeItReal GbR is not liable for damages that arise directly or indirectly from the use of the website, unless they are based on intent or gross negligence.'
      ],
      copyrightTitle: 'Copyright',
      copyrightText: [
        'All content, designs, logos and concepts published on this website are protected by copyright.',
        'Any use outside the limits of copyright law requires the written consent of TokeItReal GbR.'
      ],
      privacyTitle: 'Data Protection',
      privacyText: [
        'This website does not collect or process personal data unless this is necessary for the technical provision of the site.',
        'No analysis, tracking or sharing of data with third parties takes place.',
        'Further information can be found in our privacy policy.'
      ],
      responsibilityTitle: 'Responsible for Content (§ 55 Abs. 2 RStV)',
      responsibilityText: 'Christopher Haß and Felix Behnke at the address given above'
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
              <div className="space-y-2">
                <p className="text-gray-900 dark:text-gray-100">
                  <strong>{currentContent.companyInfo.name}</strong>
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  {currentContent.companyInfo.representatives}
                </p>
                <p className="text-gray-900 dark:text-gray-100">
                  <strong>{currentContent.companyInfo.founders}</strong>
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  {currentContent.companyInfo.address}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  {currentContent.companyInfo.city}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  {currentContent.companyInfo.country}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  E-Mail: {currentContent.companyInfo.email}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Web: {currentContent.companyInfo.web}
                </p>
              </div>
            </div>
          </section>

          {/* Representation */}
          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-6">
              {currentContent.representationTitle}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {currentContent.representationText}
            </p>
          </section>

          {/* Company Form */}
          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-6">
              {currentContent.companyFormTitle}
            </h2>
            <div className="space-y-4">
              {currentContent.companyFormText.map((paragraph, index) => (
                <p key={index} className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          {/* Activity Status */}
          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-6">
              {currentContent.activityStatusTitle}
            </h2>
            <div className="space-y-4">
              {currentContent.activityStatusText.map((paragraph, index) => (
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

          {/* Responsibility */}
          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-6">
              {currentContent.responsibilityTitle}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {currentContent.responsibilityText}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};