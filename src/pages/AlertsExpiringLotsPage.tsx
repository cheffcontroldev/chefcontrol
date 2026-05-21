import ExpiringLotsList from '@/features/alerts/components/ExpiringLotsList';
import { usePageTitle } from '@/shared/hooks/usePageTitle';

/** Page component for displaying lots that are nearing their expiration date. */
export default function AlertsExpiringLotsPage() {
  usePageTitle('Alertas - Lotes por vencer');
  return (
    <div className="w-full max-w-7xl py-6">
      <ExpiringLotsList />
    </div>
  );
}
