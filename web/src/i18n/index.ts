import menuData from '../testmenu.json';
import { MenuData } from '../types/menu';
import { en } from './en';
import { nl } from './nl';

const menu = menuData as MenuData;

type Translations = Record<string, string>;

const translations: Record<string, Translations> = {
  en,
  nl,
};

let currentLanguage = menu.defaultLanguage;

export const setLanguage = (langId: string): void => {
  if (menu.languages.some(lang => lang.id === langId)) {
    currentLanguage = langId;
  }
};

export const getCurrentLanguage = (): string => {
  return currentLanguage;
};

export const getAvailableLanguages = (): MenuData['languages'] => {
  return menu.languages;
};

export const t = (key: string): string => {
  const currentTranslations = translations[currentLanguage] || translations[menu.defaultLanguage];
  return currentTranslations?.[key] || key;
};
