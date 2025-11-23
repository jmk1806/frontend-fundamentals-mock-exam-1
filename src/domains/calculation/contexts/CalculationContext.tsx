import { createContext, ReactNode, useContext } from 'react';
import { useCalculation } from '../hooks/useCalculation';

interface CalculationContextValue {
  goalAmountValue: string;
  monthlyPaymentValue: string;
  savingPeriod: number;
  handleGoalAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMonthlyPaymentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSavingPeriodChange: (value: number) => void;
}

const CalculationContext = createContext<CalculationContextValue | null>(null);

interface CalculationProviderProps {
  children: ReactNode;
}

export function CalculationProvider({ children }: CalculationProviderProps) {
  const calculation = useCalculation();

  return <CalculationContext.Provider value={calculation}>{children}</CalculationContext.Provider>;
}

export function useCalculationContext() {
  const context = useContext(CalculationContext);

  if (context === null) {
    throw new Error('useCalculationContext must be used within CalculationProvider');
  }

  return context;
}
