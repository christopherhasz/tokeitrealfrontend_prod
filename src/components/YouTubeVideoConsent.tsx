import React, { useState, useEffect, useCallback } from 'react';
import { Cookie, Play, Shield, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ConsentData } from '../types';

interface YouTubeVideoConsentProps {
  videoId: string;
  title?: string;
  className?: string;
  onResetAvailable?: (resetFn: () => void) => void;
}

export const YouTubeVideoConsent: React.FC<YouTubeVideoConsentProps> = ({
  videoId,
  title = 'YouTube video player',
  className = '',
  onResetAvailable
}) => {
  const [hasConsent, setHasConsent] = useState<boolean | null>(null);
  const [showConsentDialog, setShowConsentDialog] = useState(false);
  const STORAGE_KEY = 'tokeitreal_youtube_consent';
  const CONSENT_POLICY_VERSION = '1.0.0';

  const handleReset = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setHasConsent(null);
      setShowConsentDialog(true);
    } catch (error) {
      console.error('Error resetting consent:', error);
    }
  }, [STORAGE_KEY]);

  useEffect(() => {
    const checkConsent = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const consent: ConsentData = JSON.parse(stored);
          if (consent.policyVersion === CONSENT_POLICY_VERSION) {
            setHasConsent(consent.accepted);
          } else {
            localStorage.removeItem(STORAGE_KEY);
            setHasConsent(null);
            setShowConsentDialog(true);
          }
        } else {
          setShowConsentDialog(true);
        }
      } catch (error) {
        console.error('Error reading consent from localStorage:', error);
        setShowConsentDialog(true);
      }
    };

    checkConsent();
  }, []);

  useEffect(() => {
    if (onResetAvailable) {
      onResetAvailable(handleReset);
    }
  }, [onResetAvailable, handleReset]);

  const handleAccept = () => {
    try {
      const consentData: ConsentData = {
        policyVersion: CONSENT_POLICY_VERSION,
        accepted: true,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consentData));
      setHasConsent(true);
      setShowConsentDialog(false);
    } catch (error) {
      console.error('Error saving consent to localStorage:', error);
      setHasConsent(true);
      setShowConsentDialog(false);
    }
  };

  const handleDecline = () => {
    try {
      const consentData: ConsentData = {
        policyVersion: CONSENT_POLICY_VERSION,
        accepted: false,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consentData));
      setHasConsent(false);
      setShowConsentDialog(false);
    } catch (error) {
      console.error('Error saving consent to localStorage:', error);
      setHasConsent(false);
      setShowConsentDialog(false);
    }
  };

  const handleLoadVideo = () => {
    setShowConsentDialog(true);
  };

  if (hasConsent === true) {
    return (
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full rounded-xl shadow-lg"
          width="560"
          height="315"
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
          loading="lazy"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className={`relative w-full ${className}`} style={{ paddingBottom: '56.25%' }}>
      <div className="absolute top-0 left-0 w-full h-full rounded-xl shadow-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center overflow-hidden">
        {showConsentDialog ? (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-2 md:p-4 z-10 animate-fade-in">
            <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl p-3 md:p-5 max-w-md w-full shadow-2xl transform transition-all duration-300 scale-100 max-h-[90vh] overflow-y-auto">
              <div className="hidden md:flex items-center justify-center mb-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  <Cookie className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </div>
              </div>

              <h3 className="text-base md:text-xl font-light text-gray-900 dark:text-gray-100 mb-1.5 md:mb-2 text-center">
                Cookie Consent Required
              </h3>

              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-2 md:mb-3 text-center leading-relaxed">
                To watch this video, we need to load content from YouTube, which may set cookies on your device.
              </p>

              <div className="flex flex-row gap-1.5 md:gap-2">
                <button
                  onClick={handleDecline}
                  className="flex-1 px-2 md:px-3 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-light text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  Decline
                </button>
                <button
                  onClick={handleAccept}
                  className="flex-1 px-2 md:px-3 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-light text-white dark:text-black bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  Accept & Load Video
                </button>
              </div>

              <div className="mt-2 md:mt-3 pt-2 md:pt-3 border-t border-gray-200 dark:border-gray-700 text-center space-y-1">
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  Cookie Policy Version {CONSENT_POLICY_VERSION}
                </p>
                <Link
                  to="/datenschutz"
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline inline-block"
                >
                  View Privacy Policy / Datenschutzerklärung
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-sm flex items-center justify-center mb-6 transform transition-all duration-300 hover:scale-110">
              <Play className="w-10 h-10 text-gray-600 dark:text-gray-400" />
            </div>

            <h3 className="text-xl font-light text-gray-700 dark:text-gray-300 mb-3">
              Video Content Unavailable
            </h3>

            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm">
              This video requires cookie consent to load. Click below to review and accept.
            </p>

            <button
              onClick={handleLoadVideo}
              className="px-8 py-3 rounded-lg font-light text-white dark:text-black bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center space-x-2"
            >
              <Cookie className="w-5 h-5" />
              <span>Load Video</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
