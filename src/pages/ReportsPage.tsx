import { usePageTitle } from '@/shared/hooks/usePageTitle';

import ReportsMenu from '@/features/reports/components/ReportsMenu';

export default function ReportsPage() {
  usePageTitle('Reportes');
  return <ReportsMenu />;
}
