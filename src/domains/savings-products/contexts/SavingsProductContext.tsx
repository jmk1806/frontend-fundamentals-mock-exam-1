import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { useCalculationContext } from 'domains/calculation';
import type { SavingsProduct } from '../types/savings';
import { useSavingsProducts } from '../hooks/useSavingsProducts';

interface SavingsProductContextValue {
  selectedProduct: SavingsProduct | null;
  selectProduct: (product: SavingsProduct) => void;
  clearSelection: () => void;
  filteredSavingsProducts: SavingsProduct[];
}

const SavingsProductContext = createContext<SavingsProductContextValue | null>(null);

interface SavingsProductProviderProps {
  children: ReactNode;
}

export function SavingsProductProvider({ children }: SavingsProductProviderProps) {
  const [selectedProduct, setSelectedProduct] = useState<SavingsProduct | null>(null);
  const { savingsProducts } = useSavingsProducts();
  const { monthlyPaymentValue, savingPeriod } = useCalculationContext();

  const filteredSavingsProducts = useMemo(
    () =>
      savingsProducts.filter(savingsProduct => {
        const { minMonthlyAmount, maxMonthlyAmount, availableTerms } = savingsProduct;
        return (
          Number(monthlyPaymentValue) >= minMonthlyAmount &&
          Number(monthlyPaymentValue) <= maxMonthlyAmount &&
          availableTerms === savingPeriod
        );
      }),
    [savingsProducts, monthlyPaymentValue, savingPeriod]
  );

  useEffect(() => {
    const isSelectedProductInFilteredList = filteredSavingsProducts.some(product => product.id === selectedProduct?.id);

    if (selectedProduct && !isSelectedProductInFilteredList) {
      clearSelection();
    }
  }, [filteredSavingsProducts, selectedProduct]);

  const selectProduct = (product: SavingsProduct) => {
    setSelectedProduct(product);
  };

  const clearSelection = () => {
    setSelectedProduct(null);
  };

  return (
    <SavingsProductContext.Provider value={{ selectedProduct, selectProduct, clearSelection, filteredSavingsProducts }}>
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
