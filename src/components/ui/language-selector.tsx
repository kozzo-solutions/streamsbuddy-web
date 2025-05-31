import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "src/components/ui/select";
import { useI18n } from "src/hooks/use-i18n";

export function LanguageSelector() {
  const { language, changeLanguage } = useI18n();

  return (
    <Select value={language} onValueChange={changeLanguage}>
      <SelectTrigger className="w-20 bg-gray-800 border-gray-600 text-white">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-gray-800 border-gray-600">
        <SelectItem value="fr" className="text-white hover:bg-gray-700">
          FR
        </SelectItem>
        <SelectItem value="en" className="text-white hover:bg-gray-700">
          EN
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
