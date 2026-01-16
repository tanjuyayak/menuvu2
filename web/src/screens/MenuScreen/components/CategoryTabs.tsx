import { Category } from '../../../types/menu';
import { getCurrentLanguage } from '../../../i18n';
import './CategoryTabs.css';

type CategoryTabsProps = {
  categories: Category[];
  selectedCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
};

export const CategoryTabs = ({
  categories,
  selectedCategoryId,
  onSelectCategory,
}: CategoryTabsProps) => {
  const currentLang = getCurrentLanguage();

  return (
    <div className="category-tabs-container">
      <div className="category-tabs">
        {categories.map(category => {
          const isSelected = category.id === selectedCategoryId;
          const categoryName = category.name[currentLang] || category.name['en'] || '';
          
          return (
            <button
              key={category.id}
              className={`category-tab ${isSelected ? 'active' : ''}`}
              onClick={() => onSelectCategory(category.id)}
              aria-pressed={isSelected}
            >
              {categoryName}
            </button>
          );
        })}
      </div>
    </div>
  );
};
