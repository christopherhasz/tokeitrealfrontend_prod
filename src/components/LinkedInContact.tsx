import React from 'react';
import { Linkedin, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const LinkedInContact: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-gray-900 py-12 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left space-y-4 md:space-y-0">
          {/* Impressum Link */}
          <button
            onClick={() => navigate('/impressum')}
            className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
          >
            <FileText className="w-4 h-4" />
            <span className="text-sm">Impressum</span>
          </button>

          {/* LinkedIn Link */}
          <a
            href="https://www.linkedin.com/company/tokeitreal/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 bg-[#0A66C2] text-white rounded-lg hover:bg-[#004182] transition-colors duration-300"
          >
            <Linkedin className="w-5 h-5" />
            <span className="text-lg font-light">Connect on LinkedIn</span>
          </a>
        </div>
      </div>
    </div>
  );
};