import { usePageTitle } from '@/shared/hooks/usePageTitle';
import MovementEntryForm from '@/features/inventory/components/MovementEntryForm';

export default function MovementFormEntryPage() {
  usePageTitle('Registrar Entrada');
  return <MovementEntryForm />;
}
