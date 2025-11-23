import { Assets, colors, ListRow } from 'tosslib';
import { useSavingsProducts } from '../hooks/useSavingsProducts';
import { formatter } from 'utils';

export function SavingsProducts() {
  const { savingsProducts } = useSavingsProducts();
  return (
    <>
      {savingsProducts.map(savingsProduct => {
        const { id, name, annualRate, availableTerms, minMonthlyAmount, maxMonthlyAmount } = savingsProduct;

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
            right={<Assets.Icon name="icon-check-circle-green" />}
            onClick={() => {}}
          />
        );
      })}
    </>
  );
}
