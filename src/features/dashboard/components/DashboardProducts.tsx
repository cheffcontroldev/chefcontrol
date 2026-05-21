import { useQueryClient } from '@tanstack/react-query';

import DashboardItem from './DashboardItem';
import { useCountProducts } from '@/features/products/hooks/useCountProducts';

/**
 * Dashboard card that shows the total number of products.
 *
 * Provides a "Refrescar" button that invalidates the `['products_count']`
 * query.
 */
export default function DashboardProducts() {
  const { data: productsCount, isLoading } = useCountProducts();
  const queryClient = useQueryClient();

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: ['products_count'] });
  };

  return (
    <DashboardItem
      title="Productos"
      count={productsCount ?? 0}
      refresh={refresh}
      href="/inventario/productos"
      isLoading={isLoading}
    />
  );
}
