import LotList from '@/features/lots/components/LotList';

import { usePageTitle } from '@/shared/hooks/usePageTitle';

export default function LotsPage() {
  usePageTitle('Lotes');
  return <LotList />;
}
