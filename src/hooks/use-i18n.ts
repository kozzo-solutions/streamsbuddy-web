import { useContext } from "react";
import { I18nContext } from "../context/i18n-context";

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
