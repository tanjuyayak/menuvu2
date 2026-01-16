import { MenuItem } from '../../../types/menu';
import { getCurrentLanguage } from '../../../i18n';
import './MenuItemCard.css';

type MenuItemCardProps = {
  item: MenuItem;
  categoryId: string;
  itemIndex: number;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
  formatPrice: (cents: number) => string;
};

export const MenuItemCard = ({
  item,
  itemIndex,
  quantity,
  onAdd,
  onRemove,
  formatPrice,
}: MenuItemCardProps) => {
  const currentLang = getCurrentLanguage();
  const name = item.name[currentLang] || item.name['en'] || '';
  const description = item.description[currentLang] || item.description['en'] || '';

  return (
    <div className="menu-item-card">
      <div className="menu-item-image-container">
        <img 
          src={item.image} 
          alt={name}
          className="menu-item-image"
          loading="lazy"
        />
      </div>
      
      <div className="menu-item-content">
        <div className="menu-item-header">
          <h3 className="menu-item-name">{name}</h3>
          <span className="menu-item-price">{formatPrice(item.price)}€</span>
        </div>
        
        {description && (
          <p className="menu-item-description">{description}</p>
        )}

        <div className="menu-item-footer">
          <div className="menu-item-badges">
            {item.indicators.map((indicator, idx) => (
              <span key={idx} className="indicator-badge">
                {indicator}
              </span>
            ))}
            {item.allergens.map((allergen, idx) => (
              <span key={idx} className="allergen-badge">
                {allergen}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="menu-item-actions">
        {quantity > 0 ? (
          <div className="quantity-controls">
            <button
              className="quantity-button remove"
              onClick={onRemove}
              aria-label="Remove one"
            >
              −
            </button>
            <span className="quantity-display">{quantity}</span>
            <button
              className="quantity-button add"
              onClick={onAdd}
              aria-label="Add one"
            >
              +
            </button>
          </div>
        ) : (
          <button
            className="add-button"
            onClick={onAdd}
            aria-label={`Add ${name} to cart`}
          >
            +
          </button>
        )}
      </div>
    </div>
  );
};
