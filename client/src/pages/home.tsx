import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Registration } from "@/components/sections/registration";
import { Footer } from "@/components/sections/footer";
import { LanguageSelector } from "@/components/ui/language-selector";
import { useI18n } from "@/hooks/use-i18n";
import logoKozzo from "@assets/logokozzo.png";

export default function Home() {
  const { t } = useI18n();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-sm border-b border-gray-700 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img src={logoKozzo} alt="StreamsBuddy Logo" className="w-10 h-10" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">
                StreamsBuddy
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <button 
                onClick={() => scrollToSection('features')}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {t("nav.features")}
              </button>
              <button 
                onClick={() => scrollToSection('how-it-works')}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {t("nav.how-it-works")}
              </button>
              <button 
                onClick={() => scrollToSection('register')}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {t("nav.register")}
              </button>
            </div>
            
            <div className="flex items-center space-x-4">
              <LanguageSelector />
              
              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden text-gray-300 hover:text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-700 py-4">
              <div className="flex flex-col space-y-3">
                <button 
                  onClick={() => scrollToSection('features')}
                  className="text-gray-300 hover:text-white transition-colors text-left px-4 py-2"
                >
                  {t("nav.features")}
                </button>
                <button 
                  onClick={() => scrollToSection('how-it-works')}
                  className="text-gray-300 hover:text-white transition-colors text-left px-4 py-2"
                >
                  {t("nav.how-it-works")}
                </button>
                <button 
                  onClick={() => scrollToSection('register')}
                  className="text-gray-300 hover:text-white transition-colors text-left px-4 py-2"
                >
                  {t("nav.register")}
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Page Sections */}
      <Hero onNavigate={scrollToSection} />
      <Features />
      <HowItWorks />
      <Registration />
      <Footer />
    </div>
  );
}
