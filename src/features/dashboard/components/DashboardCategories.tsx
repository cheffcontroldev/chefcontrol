import { useQueryClient } from '@tanstack/react-query';

import DashboardItem from './DashboardItem';
import { useCountCategories } from '@/features/categories/hooks/useCountCategories';

/**
 * Dashboard card that shows the total number of categories.
 *
 * Provides a "Refrescar" button that invalidates the `['categories_count']`
 * query.
 */
export default function DashboardCategories() {
  const { data: categoriesCount, isLoading } = useCountCategories();
  const queryClient = useQueryClient();

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: ['categories_count'] });
  };

  return (
    <DashboardItem
      title="Categorías"
      count={categoriesCount ?? 0}
      refresh={refresh}
      href="/inventario/categorias"
      isLoading={isLoading}
      color="accent"
    />
  );
}
