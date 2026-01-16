import { getCurrentLanguage } from '../../../i18n';
import { MenuItem } from '../../../types/menu';
import './BasketModal.css';

type CartItem = {
  item: MenuItem;
  categoryId: string;
  itemKey: string;
  quantity: number;
};

type BasketModalProps = {
  cart: CartItem[];
  onClose: () => void;
  onConfirmOrder: () => void;
  formatPrice: (cents: number) => string;
  onAddItem: (itemKey: string) => void;
  onRemoveItem: (itemKey: string) => void;
};

export const BasketModal = ({
  cart,
  onClose,
  onConfirmOrder,
  formatPrice,
  onAddItem,
  onRemoveItem,
}: BasketModalProps) => {
  const currentLang = getCurrentLanguage();

  const totalPrice = cart.reduce((sum, cartItem) => sum + (cartItem.item.price * cartItem.quantity), 0);

  const getItemName = (item: MenuItem): string => {
    return item.name[currentLang] || item.name['en'] || '';
  };

  return (
    <div className="basket-modal-overlay" onClick={onClose}>
      <div className="basket-modal" onClick={(e) => e.stopPropagation()}>
        <div className="basket-modal-header">
          <h2 className="basket-modal-title">Basket</h2>
          <button
            className="basket-modal-close"
            onClick={onClose}
            aria-label="Close basket"
          >
            ×
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="basket-modal-content">
            <div className="basket-empty">
              <p>Your basket is empty</p>
            </div>
          </div>
        ) : (
          <>
            <div className="basket-items-scrollable">
              <div className="basket-items">
                {cart.map((cartItem) => {
                  const itemTotal = cartItem.item.price * cartItem.quantity;
                  return (
                    <div key={cartItem.itemKey} className="basket-item">
                      <div className="basket-item-info">
                        <div className="basket-item-name">{getItemName(cartItem.item)}</div>
                        <div className="basket-item-price-info">
                          <span className="basket-item-unit-price">{formatPrice(cartItem.item.price)}€</span>
                          <span className="basket-item-multiply"> × </span>
                          <span className="basket-item-quantity-text">{cartItem.quantity}</span>
                          <span className="basket-item-equals"> = </span>
                          <span className="basket-item-total">{formatPrice(itemTotal)}€</span>
                        </div>
                      </div>
                      <div className="basket-item-controls">
                        <div className="basket-item-quantity-controls">
                          <button
                            className="basket-quantity-button remove"
                            onClick={() => onRemoveItem(cartItem.itemKey)}
                            aria-label="Remove one"
                          >
                            −
                          </button>
                          <span className="basket-quantity-display">{cartItem.quantity}</span>
                          <button
                            className="basket-quantity-button add"
                            onClick={() => onAddItem(cartItem.itemKey)}
                            aria-label="Add one"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="basket-note-section">
              <textarea
                className="basket-note-input"
                placeholder="Add a note (optional)"
                rows={2}
              />
            </div>

            <div className="basket-total-section">
              <div className="basket-total-row">
                <span className="basket-total-label">Total</span>
                <span className="basket-total-amount">{formatPrice(totalPrice)}€</span>
              </div>
            </div>
          </>
        )}

        {cart.length > 0 && (
          <div className="basket-modal-footer">
            <button
              className="confirm-order-button"
              onClick={onConfirmOrder}
            >
              Confirm Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
