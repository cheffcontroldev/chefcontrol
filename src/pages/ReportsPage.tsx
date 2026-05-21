import { usePageTitle } from '@/shared/hooks/usePageTitle';

import ReportsMenu from '@/features/reports/components/ReportsMenu';

/** Page component for the reports hub — navigation to report sub-features. */
export default function ReportsPage() {
  usePageTitle('Reportes');
  return <ReportsMenu />;
}
