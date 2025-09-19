import React, { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

interface NavProps {
  showContact?: boolean;
}

export const Nav: React.FC<NavProps> = ({ showContact = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDark, toggleDarkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    // If we're not on the home page, navigate there first
    if (location.pathname !== "/") {
      navigate("/");
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const navHeight = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - navHeight;

          if (id === "newsletter") {
            const windowHeight = window.innerHeight;
            const elementHeight = element.offsetHeight;
            const centerPosition =
              offsetPosition - (windowHeight - elementHeight) / 2;

            window.scrollTo({
              top: centerPosition,
              behavior: "smooth",
            });
          } else {
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
          }
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        const navHeight = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navHeight;

        if (id === "newsletter") {
          const windowHeight = window.innerHeight;
          const elementHeight = element.offsetHeight;
          const centerPosition =
            offsetPosition - (windowHeight - elementHeight) / 2;

          window.scrollTo({
            top: centerPosition,
            behavior: "smooth",
          });
        } else {
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }
    }
    setIsOpen(false);
  };

  const handleResourcesClick = () => {
    navigate("/resources");
    setIsOpen(false);
  };

  const handleDemoPlatformClick = () => {
    navigate("/demo-platform");
    setIsOpen(false);
  };

  const handlePortfolioClick = () => {
    navigate("/portfolio");
    setIsOpen(false);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === "/") {
      scrollToSection("home");
    } else {
      navigate("/");
    }
  };

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm fixed w-full z-50 border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo - positioned on the left */}
          <div className="flex items-center">
            <a
              href="#home"
              onClick={handleLogoClick}
              className="transition-all duration-300 block"
            >
              <img
                src={
                  isDark
                    ? "/assets/TokeItReal Logo Circle weiß.png"
                    : "/assets/TokeItReal Circle.png"
                }
                alt="TokeItReal Logo"
                className="h-12 w-12 object-contain"
              />
            </a>
          </div>

          {/* Action buttons container - positioned to the right */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center space-x-6">
              {/* Resources button - always shown */}
              <button
                onClick={handleResourcesClick}
                className={`text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 font-light text-base
                         ${location.pathname === "/resources" ? "text-gray-900 dark:text-white" : ""}`}
              >
                Resources
              </button>

              <a
                href="https://www.linkedin.com/company/tokeitreal/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 font-light text-base"
              >
                Connect
              </a>

              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
                aria-label="Toggle dark mode"
              >
                {isDark ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              {showContact && (
                <>
                  <button
                    onClick={() => scrollToSection("newsletter")}
                    className="bg-black dark:bg-white text-white dark:text-black rounded-lg text-base font-light px-8 py-3
                              transform transition-all duration-500 ease-in-out
                              hover:bg-gray-800 dark:hover:bg-gray-100 hover:scale-105 hover:shadow-lg
                              active:scale-95"
                  >
                    Subscribe
                  </button>
                  <button
                    onClick={() => scrollToSection("venture")}
                    className="border-2 border-black dark:border-white text-black dark:text-white rounded-lg text-base font-bold px-8 py-3
                              transform transition-all duration-500 ease-in-out
                              hover:shadow-[0_0_15px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:scale-105
                              active:scale-95 bg-white dark:bg-gray-900"
                  >
                    Fund the Idea
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={handleResourcesClick}
              className={`text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 font-light text-sm
                       ${location.pathname === "/resources" ? "text-gray-900 dark:text-white" : ""}`}
            >
              Resources
            </button>
            <a
              href="https://www.linkedin.com/company/tokeitreal/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 font-light text-sm"
            >
              Connect
            </a>

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            
            {showContact && (
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {showContact && isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
          <div className="px-4 py-2 space-y-1">
            <button
              onClick={() => scrollToSection("newsletter")}
              className="block w-full text-left bg-black dark:bg-white text-white dark:text-black px-4 py-3 text-base font-light rounded-lg
                         hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-300"
            >
              Subscribe
            </button>
            <button
              onClick={() => scrollToSection("venture")}
              className="block w-full text-left border-2 border-black dark:border-white text-black dark:text-white px-4 py-3 text-base font-bold rounded-lg
                         hover:shadow-[0_0_15px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300 bg-white dark:bg-gray-900 mb-2"
            >
              Fund the Idea
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
