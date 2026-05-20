import { usePageTitle } from '@/shared/hooks/usePageTitle';
import Dashboard from '@/features/dashboard/components/Dashboard';

export default function DashboardPage() {
  usePageTitle('Dashboard');
  return <Dashboard />;
}
