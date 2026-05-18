import { usePageTitle } from '@/shared/hooks/usePageTitle';

import MovementList from '@/features/inventory/components/MovementList';
import MovementDetail from '@/features/inventory/components/MovementDetail';

export default function MovementsPage() {
  usePageTitle('Movimientos');
  return (
    <>
      <MovementList />
      <MovementDetail />
    </>
  );
}
