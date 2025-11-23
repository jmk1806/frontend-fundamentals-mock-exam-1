import { Assets, colors, ListRow } from 'tosslib';
import { formatter } from 'utils';
import { useSavingsProductContext } from '../contexts/SavingsProductContext';

export function SavingsProducts() {
  const { selectedProduct, selectProduct, filteredSavingsProducts } = useSavingsProductContext();

  return (
    <>
      {filteredSavingsProducts.map(savingsProduct => {
        const { id, name, annualRate, availableTerms, minMonthlyAmount, maxMonthlyAmount } = savingsProduct;
        const isSelected = selectedProduct?.id === id;

        return (
          <ListRow
            key={id}
            contents={
              <ListRow.Texts
                type="3RowTypeA"
                top={name}
                topProps={{ fontSize: 16, fontWeight: 'bold', color: colors.grey900 }}
                middle={`연 이자율: ${annualRate}%`}
                middleProps={{ fontSize: 14, color: colors.blue600, fontWeight: 'medium' }}
                bottom={`${formatter.format(minMonthlyAmount)}원 ~ ${formatter.format(maxMonthlyAmount)}원 | ${availableTerms}개월`}
                bottomProps={{ fontSize: 13, color: colors.grey600 }}
              />
            }
            right={isSelected ? <Assets.Icon name="icon-check-circle-green" /> : undefined}
            onClick={() => selectProduct(savingsProduct)}
          />
        );
      })}
    </>
  );
}
