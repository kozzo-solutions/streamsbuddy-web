import { useI18n } from "@/hooks/use-i18n";
import logoKozzo from "@assets/logokozzo.png";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="bg-black border-t border-gray-800 py-10">
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-4">
        <div className="flex items-center gap-3">
          <img
            src={logoKozzo}
            alt="StreamsBuddy Logo"
            className="w-10 h-10 opacity-90"
          />
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent select-none">
            StreamsBuddy
          </span>
        </div>
        <div className="text-gray-300 text-base font-medium">
          <span className="text-gray-400">{t("footer.contact")}</span>{" "}
          <span className="font-semibold text-white">
            contact@streamsbuddy.com
          </span>
        </div>
        <div className="w-full border-t border-gray-700 mt-4 pt-4 text-center">
          <span className="text-xs text-gray-500">{t("footer.copyright")}</span>
        </div>
      </div>
    </footer>
  );
}
