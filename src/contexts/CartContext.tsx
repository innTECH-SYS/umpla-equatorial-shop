
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  id: string; // Changed from number to string (UUID)
  name: string;
  price: string;
  image: string;
  storeId: string; // Changed from number to string (UUID)
  storeName: string;
  quantity: number;
  rawPrice?: number; // Add raw price for calculations
}

export interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: string;
  enabled: boolean;
}

interface CartContextType {
  items: CartItem[];
  isCartOpen: boolean;
  addToCart: (product: any, store: any) => void;
  removeFromCart: (id: string) => void; // Changed from number to string
  updateQuantity: (id: string, quantity: number) => void; // Changed from number to string
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: any, store: any) => {
    console.log('Adding to cart - Product:', product, 'Store:', store);
    
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, {
        id: product.id, // Keep as string UUID
        name: product.name,
        price: product.price,
        image: product.image,
        storeId: product.storeId, // Keep as string UUID
        storeName: store.name,
        quantity: 1,
        rawPrice: product.rawPrice
      }];
    });
  };

  const removeFromCart = (id: string) => { // Changed parameter type
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => { // Changed parameter type
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      // Use rawPrice if available, otherwise parse from formatted price
      const price = item.rawPrice || parseInt(item.price.replace(/[^\d]/g, ''));
      return total + (price * item.quantity);
    }, 0);
  };

  return (
    <CartContext.Provider value={{
      items,
      isCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      openCart,
      closeCart,
      getTotalItems,
      getTotalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};
