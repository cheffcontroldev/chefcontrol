import { usePageTitle } from '@/shared/hooks/usePageTitle';

import MovementList from '@/features/inventory/components/MovementList';

export default function MovementsPage() {
  usePageTitle('Movimientos');
  return <MovementList />;
}
