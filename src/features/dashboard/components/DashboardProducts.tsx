import { useQueryClient } from '@tanstack/react-query';

import DashboardItem from './DashboardItem';
import { useCountProducts } from '@/features/products/hooks/useCountProducts';

export default function DashboardProducts() {
  const { data: productsCount } = useCountProducts();
  const queryClient = useQueryClient();

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: ['products_count'] });
  };

  return (
    <DashboardItem
      title="Productos"
      count={productsCount}
      refresh={refresh}
      href="/inventario/productos"
    />
  );
}
