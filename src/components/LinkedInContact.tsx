import React from 'react';
import { Linkedin } from 'lucide-react';

export const LinkedInContact: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900 py-12 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center">
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