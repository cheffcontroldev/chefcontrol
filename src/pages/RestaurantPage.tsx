import { usePageTitle } from '@/shared/hooks/usePageTitle';
import RestaurantDetail from '../features/restaurant/components/restaurantDetail';

export default function RestaurantPage() {
  usePageTitle('Detalles del Restaurante');
  return <RestaurantDetail />;
}
