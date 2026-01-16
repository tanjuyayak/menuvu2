import menuData from '../testmenu.json';
import { MenuData } from '../types/menu';

const menu = menuData as MenuData;

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
  // For menu-specific translations, key format: "category.name" or "item.name"
  const parts = key.split('.');
  
  if (parts.length === 2) {
    const [type, id] = parts;
    if (type === 'category') {
      const category = menu.categories.find(cat => cat.id === id);
      return category?.name[currentLanguage] || category?.name[menu.defaultLanguage] || key;
    }
    if (type === 'item') {
      // This would need item context, handled differently
      return key;
    }
  }
  
  // For common translations
  const translations: Record<string, Record<string, string>> = {
    'common.cart': {
      en: 'Cart',
      nl: 'Winkelwagen'
    },
    'common.items': {
      en: 'items',
      nl: 'artikelen'
    },
    'common.add': {
      en: 'Add',
      nl: 'Toevoegen'
    },
    'common.viewOrder': {
      en: 'View Order',
      nl: 'Bestelling Bekijken'
    },
    'common.total': {
      en: 'Total',
      nl: 'Totaal'
    }
  };
  
  const translation = translations[key];
  if (translation) {
    return translation[currentLanguage] || translation[menu.defaultLanguage] || key;
  }
  
  return key;
};
