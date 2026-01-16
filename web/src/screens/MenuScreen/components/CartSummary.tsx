import './CartSummary.css';

type CartSummaryProps = {
  totalItems: number;
  totalPrice: number;
  formatPrice: (cents: number) => string;
  onViewBasket: () => void;
};

export const CartSummary = ({
  totalItems,
  totalPrice,
  formatPrice,
  onViewBasket,
}: CartSummaryProps) => {
  return (
    <div className="cart-summary" onClick={onViewBasket}>
      <div className="cart-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 8C4.44772 8 4 8.44772 4 9V20C4 20.5523 4.44772 21 5 21H19C19.5523 21 20 20.5523 20 20V9C20 8.44772 19.5523 8 19 8H5ZM6 10H18V19H6V10Z" fill="currentColor"/>
          <path d="M8 5C7.44772 5 7 5.44772 7 6V7H9V6C9 5.44772 8.55228 5 8 5Z" fill="currentColor"/>
          <path d="M16 5C15.4477 5 15 5.44772 15 6V7H17V6C17 5.44772 16.5523 5 16 5Z" fill="currentColor"/>
          <path d="M9 3C8.44772 3 8 3.44772 8 4V5H10V4C10 3.44772 9.55228 3 9 3Z" fill="currentColor"/>
          <path d="M15 3C14.4477 3 14 3.44772 14 4V5H16V4C16 3.44772 15.5523 3 15 3Z" fill="currentColor"/>
          <path d="M10 2C9.44772 2 9 2.44772 9 3C9 3.55228 9.44772 4 10 4H14C14.5523 4 15 3.55228 15 3C15 2.44772 14.5523 2 14 2H10Z" fill="currentColor"/>
        </svg>
      </div>
      <div className="cart-items-text">
        {totalItems} {totalItems === 1 ? 'item' : 'items'} added
      </div>
      <button className="view-basket-button" onClick={onViewBasket}>
        View Basket
      </button>
    </div>
  );
};
