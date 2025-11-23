import { Assets, Border, colors, ListHeader, ListRow, Spacing } from 'tosslib';
import { useCalculationResults } from '../hooks/useCalculationResults';
import { useSavingsProductContext } from 'domains/savings-products';
import { formatter } from 'utils';
import { CalculationResultsData } from '../types';

function ExpectedResult({ result }: { result: CalculationResultsData }) {
  const { expectedAmount, differenceFromGoal, recommendedMonthlyPayment } = result;
  return (
    <>
      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="예상 수익 금액"
            topProps={{ color: colors.grey600 }}
            bottom={`${formatter.format(expectedAmount)}원`}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />
      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="목표 금액과의 차이"
            topProps={{ color: colors.grey600 }}
            bottom={`${differenceFromGoal >= 0 ? '' : '-'}${formatter.format(Math.abs(differenceFromGoal))}원`}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />
      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="추천 월 납입 금액"
            topProps={{ color: colors.grey600 }}
            bottom={`${formatter.format(recommendedMonthlyPayment)}원`}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />
    </>
  );
}

function RecommendedProducts() {
  const { filteredSavingsProducts } = useSavingsProductContext();
  const { selectedProduct, selectProduct } = useSavingsProductContext();

  const topTwoProducts = filteredSavingsProducts.sort((a, b) => b.annualRate - a.annualRate).slice(0, 2);

  return (
    <>
      {topTwoProducts.map(product => {
        const { id, name, annualRate, availableTerms, minMonthlyAmount, maxMonthlyAmount } = product;
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
            onClick={() => selectProduct(product)}
          />
        );
      })}
    </>
  );
}

export function CalculationResults() {
  const results = useCalculationResults();

  if (!results) {
    return <ListRow contents={<ListRow.Texts type="1RowTypeA" top="상품을 선택해주세요." />} />;
  }

  return (
    <>
      <Spacing size={8} />
      <ExpectedResult result={results} />
      <Spacing size={8} />
      <Border height={16} />
      <Spacing size={8} />

      <ListHeader title={<ListHeader.TitleParagraph fontWeight="bold">추천 상품 목록</ListHeader.TitleParagraph>} />
      <Spacing size={12} />

      <RecommendedProducts />
      <Spacing size={40} />
    </>
  );
}
