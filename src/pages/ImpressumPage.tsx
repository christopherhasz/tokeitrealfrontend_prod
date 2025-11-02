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
        representatives: 'vertreten durch die Gesellschafter',
        founders: 'Christopher Haß & Felix Behnke',
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
        'Die Website tokeitreal.com wird von der TokeItReal GbR, vertreten durch die Gesellschafter Christopher Haß und Felix Behnke, betrieben.',
        'Die Gesellschaft befindet sich derzeit in der Entwicklungs- und Konzeptphase.',
        'Die auf dieser Website bereitgestellten Informationen dienen ausschließlich der allgemeinen Darstellung des Projekts „TokeItReal" sowie der Vorstellung des zugrunde liegenden Konzepts zur Digitalisierung und Tokenisierung von Immobilienwerten.',
        'Es werden derzeit keine Finanzdienstleistungen, keine Anlageberatung, keine Vermittlung von Finanzinstrumenten, keine Verwaltung von Vermögenswerten und keine Angebote zum Erwerb oder zur Veräußerung von Wertpapieren, Token oder sonstigen Vermögenswerten im Sinne des Kreditwesengesetzes (KWG), Wertpapierinstitutsgesetzes (WpIG), elektronischen Wertpapiergesetzes (eWpG) oder Wertpapierprospektgesetzes (WpPG) erbracht.',
        'Alle auf dieser Website enthaltenen Beschreibungen, Darstellungen und Abbildungen sind unverbindlich und stellen weder eine rechtliche noch eine finanzielle Empfehlung oder Aufforderung zum Tätigwerden dar.',
        'Sie dienen ausschließlich dem Informationszweck über die geplante Unternehmensentwicklung der TokeItReal GbR.',
        'Die TokeItReal GbR übernimmt keine Gewähr für die Richtigkeit, Vollständigkeit oder Aktualität der bereitgestellten Informationen. Jegliche Haftung für Schäden materieller oder immaterieller Art, die durch die Nutzung oder Nichtnutzung der angebotenen Informationen entstehen, ist ausgeschlossen, soweit kein nachweislich vorsätzliches oder grob fahrlässiges Verschulden vorliegt.',
        'Die Gesellschaft behält sich ausdrücklich vor, Teile der Seiten oder das gesamte Angebot ohne gesonderte Ankündigung zu verändern, zu ergänzen, zu löschen oder die Veröffentlichung zeitweise oder endgültig einzustellen.'
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
        address: 'Waldstraße 21',
        city: '15345 Altlandsberg',
        country: 'Germany',
        email: 'info@tokeitreal.com',
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
        'The website tokeitreal.com is operated by TokeItReal GbR, represented by the partners Christopher Haß and Felix Behnke.',
        'The company is currently in the development and conceptual phase.',
        'The information provided on this website serves exclusively for the general presentation of the "TokeItReal" project and the introduction of the underlying concept for the digitization and tokenization of real estate values.',
        'Currently, no financial services, investment advice, brokerage of financial instruments, asset management, or offers for the acquisition or disposal of securities, tokens, or other assets within the meaning of the Banking Act (KWG), Securities Institute Act (WpIG), Electronic Securities Act (eWpG), or Securities Prospectus Act (WpPG) are provided.',
        'All descriptions, representations, and illustrations contained on this website are non-binding and do not constitute legal or financial recommendations or calls to action.',
        'They serve exclusively for informational purposes about the planned business development of TokeItReal GbR.',
        'TokeItReal GbR assumes no responsibility for the accuracy, completeness, or timeliness of the information provided. Any liability for material or immaterial damages arising from the use or non-use of the information offered is excluded, unless there is demonstrable intentional or grossly negligent fault.',
        'The company expressly reserves the right to change, supplement, delete parts of the pages or the entire offer without separate notice, or to discontinue publication temporarily or permanently.'
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