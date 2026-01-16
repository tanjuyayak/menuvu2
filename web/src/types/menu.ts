export type MenuData = {
  defaultLanguage: string;
  languages: Language[];
  categories: Category[];
};

export type Language = {
  id: string;
  name: string;
};

export type Category = {
  id: string;
  name: Record<string, string>;
  items: MenuItem[];
};

export type MenuItem = {
  name: Record<string, string>;
  description: Record<string, string>;
  price: number;
  image: string;
  indicators: string[];
  allergens: string[];
};
