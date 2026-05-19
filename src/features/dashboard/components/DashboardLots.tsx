import { useQueryClient } from '@tanstack/react-query';

import DashboardItem from './DashboardItem';
import { useCountLots } from '@/features/lots/hooks/useCountLots';

export default function DashboardLots() {
  const { data: lotsCount, isLoading } = useCountLots();
  const queryClient = useQueryClient();

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: ['lots_count'] });
  };

  return (
    <DashboardItem
      title="Lotes"
      count={lotsCount}
      refresh={refresh}
      href="/inventario/lotes"
      isLoading={isLoading}
    />
  );
}
