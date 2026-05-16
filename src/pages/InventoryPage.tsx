import { usePageTitle } from '@/shared/hooks/usePageTitle';

import InventoryMenu from '@/features/inventory/components/InventoryMenu';

export default function InventoryPage() {
  usePageTitle('Inventario');

  return <InventoryMenu />;
}
