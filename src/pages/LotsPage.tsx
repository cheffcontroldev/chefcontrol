import LotList from '@/features/lots/components/LotList';
import LotDetail from '@/features/lots/components/LotDetail';

import { usePageTitle } from '@/shared/hooks/usePageTitle';

export default function LotsPage() {
  usePageTitle('Lotes');
  return (
    <>
      <LotList />
      <LotDetail />
    </>
  );
}
