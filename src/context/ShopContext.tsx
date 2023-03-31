import React, {useState, createContext, ReactNode} from 'react';

interface Item {
  id: number;
  quantity: number;
}

interface ShopContextProps {
  cartItems: Item[];
  setCartItems: React.Dispatch<React.SetStateAction<Item[]>>;
  getItemQuantity: (id: number) => number;
  increaseItemQuantity: (id: number) => void;
  decreaseItemQuantity: (id: number) => void;
  removeItem: (id: number) => void;
}

export const ShopContext = createContext<ShopContextProps>({
  cartItems: [],
  setCartItems: () => {},
  getItemQuantity: () => 0,
  increaseItemQuantity: () => {},
  decreaseItemQuantity: () => {},
  removeItem: () => {},
});

export const ShopProvider = ({children}: {children: ReactNode}) => {
  const [cartItems, setCartItems] = useState<Item[]>([]);

  const getItemQuantity = (id: number) => {
    const item = cartItems.find(item => item.id === id);
    return item ? item.quantity : 0;
  };

  const increaseItemQuantity = (id: number) => {
    setCartItems(currentCartItems => {
      const item = currentCartItems.find(item => item.id === id);
      if (!item) {
        return [...currentCartItems, {id, quantity: 1}];
      } else {
        return currentCartItems.map(item =>
          item.id === id ? {...item, quantity: item.quantity + 1} : item,
        );
      }
    });
  };

  const decreaseItemQuantity = (id: number) => {
    setCartItems(currentCartItems => {
      const item = currentCartItems.find(item => item.id === id);
      if (!item) {
        return currentCartItems;
      } else if (item.quantity === 1) {
        return currentCartItems.filter(item => item.id !== id);
      } else {
        return currentCartItems.map(item =>
          item.id === id ? {...item, quantity: item.quantity - 1} : item,
        );
      }
    });
  };

  const removeItem = (id: number) => {
    setCartItems(currentCartItems =>
      currentCartItems.filter(item => item.id !== id),
    );
  };

  return (
    <ShopContext.Provider
      value={{
        cartItems,
        setCartItems,
        getItemQuantity,
        increaseItemQuantity,
        decreaseItemQuantity,
        removeItem,
      }}>
      {children}
    </ShopContext.Provider>
  );
};
