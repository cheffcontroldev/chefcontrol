import { usePageTitle } from '@/shared/hooks/usePageTitle';
import MovementExitForm from '@/features/inventory/components/MovementExitForm';

export default function MovementFormExitPage() {
  usePageTitle('Registrar Salida');
  return <MovementExitForm />;
}
