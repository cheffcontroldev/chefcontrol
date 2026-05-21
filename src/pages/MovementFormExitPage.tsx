import { usePageTitle } from '@/shared/hooks/usePageTitle';
import MovementExitForm from '@/features/inventory/components/MovementExitForm';

/** Page component for registering an inventory exit (stock-out) movement. */
export default function MovementFormExitPage() {
  usePageTitle('Registrar Salida');
  return <MovementExitForm />;
}
