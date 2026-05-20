import { useQueryClient } from '@tanstack/react-query';

import DashboardItem from './DashboardItem';
import { useCountCategories } from '@/features/categories/hooks/useCountCategories';

export default function DashboardCategories() {
  const { data: categoriesCount, isLoading } = useCountCategories();
  const queryClient = useQueryClient();

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: ['categories_count'] });
  };

  return (
    <DashboardItem
      title="Categorías"
      count={categoriesCount}
      refresh={refresh}
      href="/inventario/categorias"
      isLoading={isLoading}
    />
  );
}
