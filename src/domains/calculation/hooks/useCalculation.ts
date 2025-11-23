import { ChangeEvent, useState } from 'react';
import { formatNumberToString, parseNumberFromString } from 'utils';

interface CalculationState {
  goalAmount: number;
  monthlyPayment: number;
  savingPeriod: number;
}

interface CalculationHandlers {
  goalAmountValue: string;
  monthlyPaymentValue: string;
  savingPeriod: number;
  handleGoalAmountChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleMonthlyPaymentChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSavingPeriodChange: (value: number) => void;
}

export function useCalculation(): CalculationHandlers {
  const [state, setState] = useState<CalculationState>({
    goalAmount: 0,
    monthlyPayment: 0,
    savingPeriod: 12,
  });

  const handleGoalAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const numericValue = parseNumberFromString(e.target.value);
    setState(prev => ({ ...prev, goalAmount: numericValue }));
  };

  const handleMonthlyPaymentChange = (e: ChangeEvent<HTMLInputElement>) => {
    const numericValue = parseNumberFromString(e.target.value);
    setState(prev => ({ ...prev, monthlyPayment: numericValue }));
  };

  const handleSavingPeriodChange = (value: number) => {
    setState(prev => ({ ...prev, savingPeriod: value }));
  };

  return {
    goalAmountValue: formatNumberToString(state.goalAmount),
    monthlyPaymentValue: formatNumberToString(state.monthlyPayment),
    savingPeriod: state.savingPeriod,
    handleGoalAmountChange,
    handleMonthlyPaymentChange,
    handleSavingPeriodChange,
  };
}
