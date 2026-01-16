export type IconType = 'indicator' | 'allergen';

export const getIcon = (type: IconType, value: string): string => {
  if (type === 'indicator') {
    const indicatorMap: Record<string, string> = {
      vegetarian: '♻',
      vegan: '✦',
      helal: '✧',
    };
    return indicatorMap[value.toLowerCase()] || '•';
  }

  if (type === 'allergen') {
    const allergenMap: Record<string, string> = {
      gluten: '⚠',
      eggs: '○',
      lactose: '◉',
      nuts: '◈',
      sesame: '◊',
    };
    return allergenMap[value.toLowerCase()] || '⚠';
  }

  return '•';
};

export const getIconTitle = (type: IconType, value: string): string => {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};
