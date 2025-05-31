import { Button } from "@/components/ui/button";
import { useI18n } from "@/hooks/use-i18n";
import logoKozzo from "@assets/logokozzo.png";

interface HeroProps {
  onNavigate: (section: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  const { t } = useI18n();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-black"></div>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute top-1/2 right-1/4 w-24 h-24 bg-white rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-blue-400 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-bounce">
          <img
            src={logoKozzo}
            alt="StreamsBuddy Logo"
            className="w-40 h-40 mx-auto mb-8"
          />
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="bg-gradient-to-r from-blue-400 via-white to-blue-400 bg-clip-text text-transparent">
            {t("hero.title")}
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
          {t("hero.subtitle")}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => onNavigate("register")}
            className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-800 hover:to-blue-600 px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
            size="lg"
          >
            {t("hero.cta")}
          </Button>
          <Button
            onClick={() => onNavigate("features")}
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-semibold transition-all duration-300"
            size="lg"
          >
            {t("hero.learn-more")}
          </Button>
        </div>
      </div>
    </section>
  );
}
