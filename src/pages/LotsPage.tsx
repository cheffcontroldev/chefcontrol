import LotList from '@/features/lots/components/LotList';
import LotDetail from '@/features/lots/components/LotDetail';

import { usePageTitle } from '@/shared/hooks/usePageTitle';

/** Page component for managing lots — list view and detail panel. */
export default function LotsPage() {
  usePageTitle('Lotes');
  return (
    <>
      <LotList />
      <LotDetail />
    </>
  );
}
