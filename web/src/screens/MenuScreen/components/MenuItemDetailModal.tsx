import { MenuItem } from '../../../types/menu';
import { getCurrentLanguage } from '../../../i18n';
import './MenuItemDetailModal.css';

type MenuItemDetailModalProps = {
  item: MenuItem;
  onClose: () => void;
  onAddToCart: () => void;
  onRemoveFromCart: () => void;
  quantity: number;
  formatPrice: (cents: number) => string;
};

export const MenuItemDetailModal = ({
  item,
  onClose,
  onAddToCart,
  onRemoveFromCart,
  quantity,
  formatPrice,
}: MenuItemDetailModalProps) => {
  const currentLang = getCurrentLanguage();
  const name = item.name[currentLang] || item.name['en'] || '';
  const description = item.description[currentLang] || item.description['en'] || '';

  return (
    <div className="item-detail-modal-overlay" onClick={onClose}>
      <div className="item-detail-modal" onClick={(e) => e.stopPropagation()}>
        <div className="item-detail-modal-header">
          <h2 className="item-detail-modal-title">{name}</h2>
          <button
            className="item-detail-modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="item-detail-modal-body">
          <div className="item-detail-image-container">
            <img 
              src={item.image} 
              alt={name}
              className="item-detail-image"
            />
          </div>

          <div className="item-detail-content">
            <div className="item-detail-price-section">
              <span className="item-detail-price">{formatPrice(item.price)}€</span>
            </div>

            {description && (
              <div className="item-detail-description-section">
                <p className="item-detail-description">{description}</p>
              </div>
            )}

            {(item.indicators.length > 0 || item.allergens.length > 0) && (
              <div className="item-detail-badges-section">
                <div className="item-detail-badges">
                  {item.indicators.map((indicator, idx) => (
                    <span key={idx} className="item-detail-indicator-badge">
                      {indicator}
                    </span>
                  ))}
                  {item.allergens.map((allergen, idx) => (
                    <span key={idx} className="item-detail-allergen-badge">
                      {allergen}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="item-detail-modal-footer">
          {quantity === 0 ? (
            <>
              <button
                className="item-detail-add-button"
                onClick={onAddToCart}
              >
                Add to Cart
              </button>
              <button
                className="item-detail-modal-close-footer"
                onClick={onClose}
                aria-label="Close"
              >
                ×
              </button>
            </>
          ) : (
            <>
              <div className="item-detail-quantity-section">
                <button
                  className="item-detail-quantity-button remove"
                  onClick={onRemoveFromCart}
                  aria-label="Remove one"
                >
                  −
                </button>
                <span className="item-detail-quantity-display">{quantity}</span>
                <button
                  className="item-detail-quantity-button add"
                  onClick={onAddToCart}
                  aria-label="Add one"
                >
                  +
                </button>
              </div>
              <button
                className="item-detail-modal-close-footer"
                onClick={onClose}
                aria-label="Close"
              >
                ×
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
