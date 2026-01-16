import { useState, useMemo } from 'react';
import { MenuData, Category, MenuItem } from '../../types/menu';
import { getCurrentLanguage, setLanguage, getAvailableLanguages, t } from '../../i18n';
import menuData from '../../testmenu.json';
import { CategoryTabs } from './components/CategoryTabs';
import { MenuItemsList } from './components/MenuItemsList';
import { CartSummary } from './components/CartSummary';
import { LanguageDropdown } from './components/LanguageDropdown';
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

export const MenuScreen = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(menu.categories[0]?.id || '');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentLang, setCurrentLang] = useState<string>(getCurrentLanguage());

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

  return (
    <div className="menu-screen">
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

      <main className="menu-content">
        {selectedCategory && (
          <MenuItemsList
            items={selectedCategory.items}
            categoryId={selectedCategory.id}
            onAddToCart={handleAddToCart}
            onRemoveFromCart={handleRemoveFromCart}
            getItemQuantity={getItemQuantity}
            formatPrice={formatPrice}
          />
        )}
      </main>

      {totalItems > 0 && (
        <CartSummary
          totalItems={totalItems}
          totalPrice={totalPrice}
          formatPrice={formatPrice}
        />
      )}
    </div>
  );
};
