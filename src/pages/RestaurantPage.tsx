import { usePageTitle } from '@/shared/hooks/usePageTitle';
import RestaurantDetail from '../features/restaurant/components/RestaurantDetail';
import RestaurantForm from '../features/restaurant/components/RestaurantForm';

/** Page component that displays restaurant details and the edit form. */
export default function RestaurantPage() {
  usePageTitle('Detalles del Restaurante');
  return (
    <>
      <RestaurantDetail />
      <RestaurantForm />
    </>
  );
}
