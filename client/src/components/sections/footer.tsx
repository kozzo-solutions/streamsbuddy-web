import { useI18n } from "@/hooks/use-i18n";
import logoKozzo from "@assets/logokozzo.png";
import { Twitter, MessageCircle } from "lucide-react";
import { SiTwitch } from "react-icons/si";

export function Footer() {
  const { t } = useI18n();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-black border-t border-gray-700 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img src={logoKozzo} alt="StreamsBuddy Logo" className="w-12 h-12" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">
                StreamsBuddy
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              {t("footer.description")}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <MessageCircle className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-500 transition-colors">
                <SiTwitch className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">{t("footer.product")}</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button 
                  onClick={() => scrollToSection('features')}
                  className="hover:text-white transition-colors text-left"
                >
                  {t("footer.features")}
                </button>
              </li>
              <li><a href="#" className="hover:text-white transition-colors">{t("footer.pricing")}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t("footer.roadmap")}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">{t("footer.support")}</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">{t("footer.help")}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t("footer.contact")}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t("footer.privacy")}</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-700 mt-8 pt-8 text-center text-gray-400">
          <p>{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
