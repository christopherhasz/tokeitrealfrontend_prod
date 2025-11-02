import React, { useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ResourcesPage } from "./pages/ResourcesPage";
import { AboutUsPage } from "./pages/AboutUsPage";
import { ImpressumPage } from "./pages/ImpressumPage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";

const App: React.FC = () => {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const u = "https://analytics.tokeitreal.com/";
    const scriptSrc = u + "matomo.js";

    // Check if Matomo script already exists
    if (document.querySelector(`script[src="${scriptSrc}"]`)) {
      return;
    }

    // Initialize _paq if it doesn't exist
    window._paq = window._paq || [];

    // Configure Matomo
    window._paq.push(["disableCookies"]);
    window._paq.push(["trackPageView"]);
    window._paq.push(["enableLinkTracking"]);

    // Set up the tracker
    window._paq.push(["setTrackerUrl", u + "matomo.php"]);
    window._paq.push(["setSiteId", "1"]);

    // Create and append the tracking script
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = scriptSrc;

    const firstScript = document.getElementsByTagName("script")[0];
    firstScript.parentNode?.insertBefore(script, firstScript);
  }, []);

  return (
    <>
      <Router>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/impressum" element={<ImpressumPage />} />
            <Route path="/datenschutz" element={<PrivacyPolicyPage />} />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
