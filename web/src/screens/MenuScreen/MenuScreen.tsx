import { useState, useMemo, useEffect, useRef } from 'react';
import { MenuData, Category, MenuItem } from '../../types/menu';
import { getCurrentLanguage, setLanguage, getAvailableLanguages, t } from '../../i18n';
import menuData from '../../testmenu.json';
import { CategoryTabs } from './components/CategoryTabs';
import { MenuItemsList } from './components/MenuItemsList';
import { CartSummary } from './components/CartSummary';
import { LanguageDropdown } from './components/LanguageDropdown';
import { BasketModal } from './components/BasketModal';
import { MenuItemDetailModal } from './components/MenuItemDetailModal';
import './MenuScreen.css';

const menu = menuData as MenuData;

type CartItem = {
  item: MenuItem;
  categoryId: string;
  itemKey: string;
  quantity: number;
};

const getItemKey = (item: MenuItem, categoryId: string, itemIndex: number): string => {
  return `${categoryId}-${itemIndex}`;
};

type SelectedItemDetail = {
  item: MenuItem;
  categoryId: string;
  itemIndex: number;
} | null;

export const MenuScreen = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(menu.categories[0]?.id || '');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentLang, setCurrentLang] = useState<string>(getCurrentLanguage());
  const [isBasketModalOpen, setIsBasketModalOpen] = useState<boolean>(false);
  const [selectedItemDetail, setSelectedItemDetail] = useState<SelectedItemDetail>(null);
  const [contentKey, setContentKey] = useState<number>(0);

  const selectedCategory = useMemo(() => {
    return menu.categories.find(cat => cat.id === selectedCategoryId);
  }, [selectedCategoryId]);

  const handleLanguageChange = (langId: string) => {
    setLanguage(langId);
    setCurrentLang(langId);
  };

  const handleAddToCart = (item: MenuItem, categoryId: string, itemIndex: number) => {
    const itemKey = getItemKey(item, categoryId, itemIndex);
    setCart(prevCart => {
      const existingItem = prevCart.find(
        cartItem => cartItem.itemKey === itemKey
      );
      
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.itemKey === itemKey
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      
      return [...prevCart, { item, categoryId, itemKey, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (item: MenuItem, categoryId: string, itemIndex: number) => {
    const itemKey = getItemKey(item, categoryId, itemIndex);
    setCart(prevCart => {
      const existingItem = prevCart.find(
        cartItem => cartItem.itemKey === itemKey
      );
      
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(cartItem =>
          cartItem.itemKey === itemKey
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      }
      
      return prevCart.filter(
        cartItem => cartItem.itemKey !== itemKey
      );
    });
  };

  const getItemQuantity = (item: MenuItem, categoryId: string, itemIndex: number): number => {
    const itemKey = getItemKey(item, categoryId, itemIndex);
    const cartItem = cart.find(
      cartItem => cartItem.itemKey === itemKey
    );
    return cartItem?.quantity || 0;
  };

  const totalItems = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const totalPrice = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.item.price * item.quantity), 0);
  }, [cart]);

  const formatPrice = (cents: number): string => {
    return (cents / 100).toFixed(2);
  };

  const handleConfirmOrder = () => {
    // TODO: Implement order confirmation
    console.log('Order confirmed:', cart);
    setIsBasketModalOpen(false);
    // You can add order submission logic here
  };

  const handleAddItemInBasket = (itemKey: string) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(
        cartItem => cartItem.itemKey === itemKey
      );
      
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.itemKey === itemKey
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      
      return prevCart;
    });
  };

  const handleRemoveItemInBasket = (itemKey: string) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(
        cartItem => cartItem.itemKey === itemKey
      );
      
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(cartItem =>
          cartItem.itemKey === itemKey
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      }
      
      return prevCart.filter(
        cartItem => cartItem.itemKey !== itemKey
      );
    });
  };

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isBasketModalOpen || selectedItemDetail) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [isBasketModalOpen, selectedItemDetail]);

  // Reset content key when category changes to ensure alignment
  useEffect(() => {
    setContentKey(prev => prev + 1);
  }, [selectedCategoryId]);

  // Reset content key when language changes
  useEffect(() => {
    setContentKey(prev => prev + 1);
  }, [currentLang]);

  return (
    <div className={`menu-screen ${isBasketModalOpen || selectedItemDetail ? 'modal-open' : ''}`}>
      <header className="menu-header">
        <h1 className="menu-title">Menu</h1>
        <LanguageDropdown
          currentLang={currentLang}
          onLanguageChange={handleLanguageChange}
        />
      </header>

      <CategoryTabs
        categories={menu.categories}
        selectedCategoryId={selectedCategoryId}
        onSelectCategory={setSelectedCategoryId}
      />

      <main key={contentKey} className="menu-content">
        {selectedCategory && (
          <MenuItemsList
            items={selectedCategory.items}
            categoryId={selectedCategory.id}
            onAddToCart={handleAddToCart}
            onRemoveFromCart={handleRemoveFromCart}
            getItemQuantity={getItemQuantity}
            formatPrice={formatPrice}
            onItemClick={(item, categoryId, itemIndex) => 
              setSelectedItemDetail({ item, categoryId, itemIndex })
            }
          />
        )}
      </main>

      {totalItems > 0 && (
        <CartSummary
          totalItems={totalItems}
          totalPrice={totalPrice}
          formatPrice={formatPrice}
          onViewBasket={() => setIsBasketModalOpen(true)}
        />
      )}

      {isBasketModalOpen && (
        <BasketModal
          cart={cart}
          onClose={() => setIsBasketModalOpen(false)}
          onConfirmOrder={handleConfirmOrder}
          formatPrice={formatPrice}
          onAddItem={handleAddItemInBasket}
          onRemoveItem={handleRemoveItemInBasket}
        />
      )}

      {selectedItemDetail && (
        <MenuItemDetailModal
          item={selectedItemDetail.item}
          onClose={() => setSelectedItemDetail(null)}
          onAddToCart={() => {
            handleAddToCart(
              selectedItemDetail.item,
              selectedItemDetail.categoryId,
              selectedItemDetail.itemIndex
            );
          }}
          onRemoveFromCart={() => {
            handleRemoveFromCart(
              selectedItemDetail.item,
              selectedItemDetail.categoryId,
              selectedItemDetail.itemIndex
            );
          }}
          quantity={getItemQuantity(
            selectedItemDetail.item,
            selectedItemDetail.categoryId,
            selectedItemDetail.itemIndex
          )}
          formatPrice={formatPrice}
        />
      )}
    </div>
  );
};
