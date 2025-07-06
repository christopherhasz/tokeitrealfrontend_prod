import React, { useEffect, useState } from 'react';
import { Download, FileText } from 'lucide-react';
import { config, endpoints, logger } from '../config/environment';
import { Nav } from '../components/Nav';

export const ResourcesPage: React.FC = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const resource = {
    id: 'whitepaper',
    title: 'TokeItReal Pitch Deck',
    description: 'A simplified overview of our approach to a tokenized real estate investment process. Presented at the Berlin Blockchain Week hosted by FIBREE at w3.hub.',
    icon: FileText,
    size: '1.1 MB',
    pages: '21 pages'
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Nav />
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-gray-100 mb-6">
            Resources
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Learn more about TokeItReal's approach to tokenized real estate investment
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          {/* YouTube Video Section */}
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-light text-gray-900 dark:text-gray-100">
              Introduction Video
            </h2>
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-xl shadow-lg"
                width="560"
                height="315"
                src="https://www.youtube.com/embed/ohZQlC_6yrs?si=N4PVSScgSgYiLDLc"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Watch our introduction video to understand how TokeItReal is revolutionizing real estate investment through tokenization.
            </p>
          </div>

          {/* Resource Download Section */}
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-light text-gray-900 dark:text-gray-100">
              Download Resources
            </h2>
            <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="p-8">
                <div className="w-16 h-16 rounded-xl bg-gray-100 dark:bg-gray-900 flex items-center justify-center mb-6">
                  <resource.icon className="w-8 h-8 text-black dark:text-white" />
                </div>
                
                <h3 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-4">
                  {resource.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {resource.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-6">
                  <span>{resource.size}</span>
                  <span>{resource.pages}</span>
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
                  <span>{isDownloading ? 'Downloading...' : 'Download PDF'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 md:p-12">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-light text-gray-900 dark:text-gray-100 mb-4">
              Need More Information?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Contact us directly for additional resources or specific questions about our platform
            </p>
            <a
              href="https://www.linkedin.com/company/tokeitreal/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-lg font-light
                       hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-300
                       transform hover:scale-105 active:scale-95"
            >
              Connect with Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};