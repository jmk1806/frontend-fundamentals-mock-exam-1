import { createContext, ReactNode, useContext, useState } from 'react';
import type { SavingsProduct } from '../types/savings';

interface SavingsProductContextValue {
  selectedProduct: SavingsProduct | null;
  selectProduct: (product: SavingsProduct) => void;
  clearSelection: () => void;
}

const SavingsProductContext = createContext<SavingsProductContextValue | null>(null);

interface SavingsProductProviderProps {
  children: ReactNode;
}

export function SavingsProductProvider({ children }: SavingsProductProviderProps) {
  const [selectedProduct, setSelectedProduct] = useState<SavingsProduct | null>(null);

  const selectProduct = (product: SavingsProduct) => {
    setSelectedProduct(product);
  };

  const clearSelection = () => {
    setSelectedProduct(null);
  };

  return (
    <SavingsProductContext.Provider value={{ selectedProduct, selectProduct, clearSelection }}>
      {children}
    </SavingsProductContext.Provider>
  );
}

export function useSavingsProductContext() {
  const context = useContext(SavingsProductContext);

  if (context === null) {
    throw new Error('useSavingsProductContext must be used within SavingsProductProvider');
  }

  return context;
}
