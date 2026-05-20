import AlertConfigForm from '@/features/alerts/components/AlertConfigForm';
import { usePageTitle } from '@/shared/hooks/usePageTitle';

export default function AlertsConfigurationPage() {
  usePageTitle('Alertas - Configuración');
  return (
    <div className="py-6 w-full flex justify-center">
      <AlertConfigForm />
    </div>
  );
}
