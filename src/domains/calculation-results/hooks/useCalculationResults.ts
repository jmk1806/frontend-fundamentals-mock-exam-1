import Big from 'big.js';
import { useCalculationContext } from 'domains/calculation';
import { useSavingsProductContext } from 'domains/savings-products';
import { CalculationResultsData } from '../types';

export function useCalculationResults(): CalculationResultsData | null {
  const { selectedProduct } = useSavingsProductContext();
  const { goalAmountValue, monthlyPaymentValue, savingPeriod } = useCalculationContext();

  if (!selectedProduct) {
    return null;
  }

  const goalAmount = Number(goalAmountValue);
  const monthlyPayment = Number(monthlyPaymentValue);
  const annualRate = selectedProduct.annualRate;

  // 예상 수익 금액 = 월 납입액 * 저축 기간 * (1 + 연이자율 * 0.5)
  const expectedAmount = new Big(monthlyPayment)
    .times(savingPeriod)
    .times(new Big(1).plus(new Big(annualRate).div(100).times(0.5)))
    .toNumber();

  // 목표 금액과의 차이 = 목표 금액 - 예상 수익 금액
  const differenceFromGoal = new Big(goalAmount).minus(expectedAmount).toNumber();

  // 추천 월 납입 금액 = 목표 금액 ÷ (저축 기간 * (1 + 연이자율 * 0.5))
  // 1,000원 단위로 반올림
  const recommendedMonthlyPayment = new Big(goalAmount)
    .div(new Big(savingPeriod).times(new Big(1).plus(new Big(annualRate).div(100).times(0.5))))
    .div(1000)
    .round(0, Big.roundHalfUp)
    .times(1000)
    .toNumber();

  return {
    expectedAmount,
    differenceFromGoal,
    recommendedMonthlyPayment,
  };
}
