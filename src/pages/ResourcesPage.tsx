import React, { useEffect, useState } from 'react';
import { Download, FileText, RotateCcw, Globe } from 'lucide-react';
import { config, endpoints, logger } from '../config/environment';
import { Nav } from '../components/Nav';
import { LinkedInContact } from '../components/LinkedInContact';
import { YouTubeVideoConsent } from '../components/YouTubeVideoConsent';

export const ResourcesPage: React.FC = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const resetConsentRef = React.useRef<(() => void) | null>(null);
  const [language, setLanguage] = useState<'de' | 'en'>('en');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleResetConsentAvailable = (resetFn: () => void) => {
    resetConsentRef.current = resetFn;
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    setDownloadError(null);

    try {
      const response = await fetch(`${config.apiUrl}${endpoints.pdfDownload('TokeItRealPitch.pdf')}`);
      
      if (!response.ok) {
        throw new Error(`Download failed: ${response.status} ${response.statusText}`);
      }

      // Get the blob from the response
      const blob = await response.blob();
      
      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(blob);
      
      // Create a temporary anchor element and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = 'TokeItReal-Pitch.pdf';
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      logger.log('PDF download completed successfully');
    } catch (error) {
      logger.error('Download error:', error);
      setDownloadError(error instanceof Error ? error.message : 'Download failed. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const content = {
    en: {
      pageTitle: 'Resources',
      pageSubtitle: "Learn more about TokeItReal's approach to tokenized real estate investment",
      videoTitle: 'Introduction Video',
      videoDescription: 'Watch our introduction video to understand how TokeItReal is revolutionizing real estate investment through tokenization.',
      downloadTitle: 'Download Resources',
      resourceTitle: 'TokeItReal Pitch Deck',
      resourceDescription: 'A simplified overview of our approach to a tokenized real estate investment process. Presented at the Berlin Blockchain Week hosted by FIBREE at w3.hub.',
      resourceSize: '1.1 MB',
      resourcePages: '21 pages',
      downloadButton: 'Download PDF',
      downloading: 'Downloading...',
      moreInfoTitle: 'Need More Information?',
      moreInfoSubtitle: 'Contact us directly for additional resources or specific questions about our platform',
      connectButton: 'Connect with Us',
      cookieText: 'Need to change your cookie consent for YouTube videos?',
      resetButton: 'Reset Cookie Consent'
    },
    de: {
      pageTitle: 'Ressourcen',
      pageSubtitle: 'Erfahren Sie mehr über TokeItReals Ansatz zur tokenisierten Immobilieninvestition',
      videoTitle: 'Einführungsvideo',
      videoDescription: 'Sehen Sie sich unser Einführungsvideo an, um zu verstehen, wie TokeItReal Immobilieninvestitionen durch Tokenisierung revolutioniert.',
      downloadTitle: 'Ressourcen herunterladen',
      resourceTitle: 'TokeItReal Pitch Deck',
      resourceDescription: 'Eine vereinfachte Übersicht über unseren Ansatz für einen tokenisierten Immobilieninvestitionsprozess. Präsentiert bei der Berlin Blockchain Week, veranstaltet von FIBREE im w3.hub.',
      resourceSize: '1,1 MB',
      resourcePages: '21 Seiten',
      downloadButton: 'PDF herunterladen',
      downloading: 'Lädt herunter...',
      moreInfoTitle: 'Benötigen Sie weitere Informationen?',
      moreInfoSubtitle: 'Kontaktieren Sie uns direkt für zusätzliche Ressourcen oder spezifische Fragen zu unserer Plattform',
      connectButton: 'Kontaktieren Sie uns',
      cookieText: 'Müssen Sie Ihre Cookie-Einwilligung für YouTube-Videos ändern?',
      resetButton: 'Cookie-Einwilligung zurücksetzen'
    }
  };

  const resource = {
    id: 'whitepaper',
    icon: FileText
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Nav />
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center mb-16">
          {/* Language Toggle */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setLanguage('en')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-300 ${
                  language === 'en'
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-light">English</span>
              </button>
              <button
                onClick={() => setLanguage('de')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-300 ${
                  language === 'de'
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-light">Deutsch</span>
              </button>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-gray-100 mb-6">
            {content[language].pageTitle}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {content[language].pageSubtitle}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          {/* YouTube Video Section */}
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-light text-gray-900 dark:text-gray-100">
              {content[language].videoTitle}
            </h2>
            <YouTubeVideoConsent
              videoId="ohZQlC_6yrs"
              title="TokeItReal Introduction Video"
              onResetAvailable={handleResetConsentAvailable}
              language={language}
            />
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {content[language].videoDescription}
            </p>
          </div>

          {/* Resource Download Section */}
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-light text-gray-900 dark:text-gray-100">
              {content[language].downloadTitle}
            </h2>
            <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="p-8">
                <div className="w-16 h-16 rounded-xl bg-gray-100 dark:bg-gray-900 flex items-center justify-center mb-6">
                  <resource.icon className="w-8 h-8 text-black dark:text-white" />
                </div>

                <h3 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-4">
                  {content[language].resourceTitle}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {content[language].resourceDescription}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-6">
                  <span>{content[language].resourceSize}</span>
                  <span>{content[language].resourcePages}</span>
                </div>

                {downloadError && (
                  <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-red-600 dark:text-red-400 text-sm">{downloadError}</p>
                  </div>
                )}

                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className={`w-full bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg font-light
                           flex items-center justify-center space-x-2
                           hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-300
                           transform hover:scale-105 active:scale-95
                           disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
                >
                  <Download className={`w-5 h-5 ${isDownloading ? 'animate-spin' : ''}`} />
                  <span>{isDownloading ? content[language].downloading : content[language].downloadButton}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 md:p-12">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-light text-gray-900 dark:text-gray-100 mb-4">
              {content[language].moreInfoTitle}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              {content[language].moreInfoSubtitle}
            </p>
            <a
              href="https://www.linkedin.com/company/tokeitreal/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-lg font-light
                       hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-300
                       transform hover:scale-105 active:scale-95"
            >
              {content[language].connectButton}
            </a>
          </div>
        </div>
      </div>

      <LinkedInContact />

      {/* Cookie Reset Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {content[language].cookieText}
            </p>
            <button
              onClick={() => resetConsentRef.current?.()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-light text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{content[language].resetButton}</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};