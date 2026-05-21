import { usePageTitle } from '@/shared/hooks/usePageTitle';
import MovementEntryForm from '@/features/inventory/components/MovementEntryForm';

/** Page component for registering an inventory entry (stock-in) movement. */
export default function MovementFormEntryPage() {
  usePageTitle('Registrar Entrada');
  return <MovementEntryForm />;
}
