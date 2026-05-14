import UnitOfMeasureList from '@/features/unitsOfMeasure/components/UnitOfMeasureList';
import UnitOfMeasureForm from '@/features/unitsOfMeasure/components/UnitOfMeasureForm';
import { usePageTitle } from '@/shared/hooks/usePageTitle';

export default function UnitsOfMeasurePage() {
  usePageTitle('Unidades de Medida');
  return (
    <>
      <UnitOfMeasureList />
      <UnitOfMeasureForm />
    </>
  );
}
