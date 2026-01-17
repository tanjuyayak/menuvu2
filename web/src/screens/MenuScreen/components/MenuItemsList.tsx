import { MenuItem } from '../../../types/menu';
import { getCurrentLanguage } from '../../../i18n';
import { MenuItemCard } from './MenuItemCard';
import './MenuItemsList.css';

type MenuItemsListProps = {
  items: MenuItem[];
  categoryId: string;
  onAddToCart: (item: MenuItem, categoryId: string, itemIndex: number) => void;
  onRemoveFromCart: (item: MenuItem, categoryId: string, itemIndex: number) => void;
  getItemQuantity: (item: MenuItem, categoryId: string, itemIndex: number) => number;
  formatPrice: (cents: number) => string;
  onItemClick: (item: MenuItem, categoryId: string, itemIndex: number) => void;
};

export const MenuItemsList = ({
  items,
  categoryId,
  onAddToCart,
  onRemoveFromCart,
  getItemQuantity,
  formatPrice,
  onItemClick,
}: MenuItemsListProps) => {
  if (items.length === 0) {
    return (
      <div className="menu-items-empty">
        <p>No items available in this category</p>
      </div>
    );
  }

  return (
    <div className="menu-items-list">
      {items.map((item, index) => (
        <MenuItemCard
          key={index}
          item={item}
          categoryId={categoryId}
          itemIndex={index}
          quantity={getItemQuantity(item, categoryId, index)}
          onAdd={() => onAddToCart(item, categoryId, index)}
          onRemove={() => onRemoveFromCart(item, categoryId, index)}
          formatPrice={formatPrice}
          onItemClick={() => onItemClick(item, categoryId, index)}
        />
      ))}
    </div>
  );
};
