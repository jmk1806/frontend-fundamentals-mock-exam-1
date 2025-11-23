import { useQuery } from '@tanstack/react-query';
import type { SavingsProduct } from '../types/savings';

const QUERY_KEY_SAVINGS_PRODUCTS = 'savingsProducts';

async function fetchSavingsProducts(): Promise<SavingsProduct[]> {
  const response = await fetch('/api/savings-products');

  if (!response.ok) {
    throw new Error('적금 상품 목록을 불러오는데 실패했습니다.');
  }

  return response.json();
}

export function useSavingsProducts() {
  const savingsProductsQuery = useQuery({
    queryKey: [QUERY_KEY_SAVINGS_PRODUCTS],
    queryFn: fetchSavingsProducts,
  });

  return {
    savingsProducts: savingsProductsQuery.data ?? [],
    isLoading: savingsProductsQuery.isLoading,
    error: savingsProductsQuery.error,
  };
}
