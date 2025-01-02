'use client';

import { createContext, ReactNode, useCallback, useState } from 'react';

export const CartContext = createContext<{
  cartItems: Set<string>;
  collectItems: (items: string[]) => void;
}>({ cartItems: new Set(), collectItems: () => {} });

export default function CartContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cartItems, setCartItems] = useState(new Set<string>());

  const collectItems = useCallback(
    (items: string[]) => setCartItems(new Set([...items])),
    []
  );

  return (
    <CartContext.Provider value={{ cartItems, collectItems }}>
      {children}
    </CartContext.Provider>
  );
}
