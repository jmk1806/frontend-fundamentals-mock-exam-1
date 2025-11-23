import { useState } from 'react';
import { Calculation, CalculationProvider } from 'domains/calculation';
import { CalculationResults } from 'domains/calculation-results';
import { SavingsProducts, SavingsProductProvider } from 'domains/savings-products';
import { Border, NavigationBar, Spacing, Tab } from 'tosslib';

export function SavingsCalculatorPage() {
  const [selectedTab, setSelectedTab] = useState<'products' | 'results'>('products');

  const handleTabChange = (value: string) => {
    if (value === 'products' || value === 'results') {
      setSelectedTab(value);
    }
  };

  return (
    <CalculationProvider>
      <SavingsProductProvider>
        <NavigationBar title="적금 계산기" />

        <Spacing size={16} />

        <Calculation />

        <Spacing size={24} />
        <Border height={16} />
        <Spacing size={8} />

        <Tab onChange={handleTabChange}>
          <Tab.Item value="products" selected={selectedTab === 'products'}>
            적금 상품
          </Tab.Item>
          <Tab.Item value="results" selected={selectedTab === 'results'}>
            계산 결과
          </Tab.Item>
        </Tab>

        {selectedTab === 'products' && <SavingsProducts />}
        {selectedTab === 'results' && <CalculationResults />}
      </SavingsProductProvider>
    </CalculationProvider>
  );
}
