import BigMenuItem from '@/shared/components/BigMenuItem';
import {
  Cuboid,
  FolderTree,
  PackageMinus,
  PackageOpen,
  PackagePlus,
  Ruler,
  Table,
} from 'lucide-react';

/**
 * Inventory landing page with links to all inventory sub-modules.
 *
 * Renders {@link BigMenuItem} cards for:
 * - Products, Categories, Units of Measure, Lots
 * - Register Entry, Register Exit
 * - Movements list
 */
export default function InventoryMenu() {
  return (
    <div className="px-3 w-full max-w-6xl justify-center flex gap-4 flex-wrap">
      <BigMenuItem icon={Cuboid} title="Productos" href="/inventario/productos" />
      <BigMenuItem icon={FolderTree} title="Categorías" href="/inventario/categorias" />
      <BigMenuItem icon={Ruler} title="Unidades de Medida" href="/inventario/unidades-de-medida" />
      <BigMenuItem icon={PackageOpen} title="Lotes" href="/inventario/lotes" />
      <BigMenuItem
        icon={PackagePlus}
        title="Registrar Entrada"
        href="/inventario/registrar-entrada"
      />
      <BigMenuItem
        icon={PackageMinus}
        title="Registrar Salida"
        href="/inventario/registrar-salida"
      />
      <BigMenuItem icon={Table} title="Movimientos" href="/inventario/movimientos" />
    </div>
  );
}
