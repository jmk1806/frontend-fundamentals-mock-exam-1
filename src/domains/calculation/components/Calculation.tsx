import { SelectBottomSheet, Spacing, TextField } from 'tosslib';
import { useCalculationContext } from '../contexts/CalculationContext';
import { formatNumberWithCommas } from 'utils';

export function Calculation() {
  const {
    goalAmountValue,
    monthlyPaymentValue,
    savingPeriod,
    handleGoalAmountChange,
    handleMonthlyPaymentChange,
    handleSavingPeriodChange,
  } = useCalculationContext();

  return (
    <>
      <TextField
        label="목표 금액"
        placeholder="목표 금액을 입력하세요"
        suffix="원"
        value={formatNumberWithCommas(goalAmountValue)}
        onChange={handleGoalAmountChange}
      />
      <Spacing size={16} />
      <TextField
        label="월 납입액"
        placeholder="희망 월 납입액을 입력하세요"
        suffix="원"
        value={formatNumberWithCommas(monthlyPaymentValue)}
        onChange={handleMonthlyPaymentChange}
      />
      <Spacing size={16} />
      <SelectBottomSheet
        label="저축 기간"
        title="저축 기간을 선택해주세요"
        value={savingPeriod}
        onChange={handleSavingPeriodChange}
      >
        <SelectBottomSheet.Option value={6}>6개월</SelectBottomSheet.Option>
        <SelectBottomSheet.Option value={12}>12개월</SelectBottomSheet.Option>
        <SelectBottomSheet.Option value={24}>24개월</SelectBottomSheet.Option>
      </SelectBottomSheet>
    </>
  );
}
