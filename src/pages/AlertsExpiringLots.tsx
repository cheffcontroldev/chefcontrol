import ExpiringLotsList from '@/features/alerts/components/ExpiringLotsList';
import { usePageTitle } from '@/shared/hooks/usePageTitle';

export default function AlertsExpiringLots() {
  usePageTitle('Alertas - Lotes por vencer');
  return (
    <div className="w-full max-w-7xl py-6">
      <ExpiringLotsList />
    </div>
  );
}
