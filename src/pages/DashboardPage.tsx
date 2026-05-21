import { usePageTitle } from '@/shared/hooks/usePageTitle';
import Dashboard from '@/features/dashboard/components/Dashboard';

/** Page component for the main dashboard view. */
export default function DashboardPage() {
  usePageTitle('Dashboard');
  return <Dashboard />;
}
