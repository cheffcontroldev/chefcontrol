import { usePageTitle } from '@/shared/hooks/usePageTitle';

import AlertsMenu from '@/features/alerts/components/AlertsMenu';

export default function AlertsPage() {
  usePageTitle('Alertas');
  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Alertas</h1>
      <AlertsMenu />
    </div>
  );
}
