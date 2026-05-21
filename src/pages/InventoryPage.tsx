import { usePageTitle } from '@/shared/hooks/usePageTitle';

import InventoryMenu from '@/features/inventory/components/InventoryMenu';

/** Page component for the inventory hub — navigation to sub-features. */
export default function InventoryPage() {
  usePageTitle('Inventario');

  return <InventoryMenu />;
}
