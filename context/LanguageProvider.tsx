import { Language } from "@/types/language";
import { createContext } from "react";

interface LanguageContextProps {
  locale: Language;
  setLocale: (locale: Language) => void;
}

export const LanguageContext = createContext<LanguageContextProps>(
  {} as LanguageContextProps
);

export const LanguageProvider = () => {
  return <></>;
};
