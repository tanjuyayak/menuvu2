import { t } from '../../../i18n';
import './CartSummary.css';

type CartSummaryProps = {
  totalItems: number;
  totalPrice: number;
  formatPrice: (cents: number) => string;
};

export const CartSummary = ({
  totalItems,
  totalPrice,
  formatPrice,
}: CartSummaryProps) => {
  return (
    <div className="cart-summary">
      <div className="cart-summary-content">
        <div className="cart-info">
          <span className="cart-icon">🛒</span>
          <span className="cart-text">
            {t('common.cart')} ({totalItems} {t('common.items')})
          </span>
        </div>
        <div className="cart-total">
          {formatPrice(totalPrice)} €
        </div>
      </div>
      <button className="view-order-button">
        {t('common.viewOrder')}
      </button>
    </div>
  );
};
