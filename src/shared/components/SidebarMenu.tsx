import {
  Home,
  Settings,
  Cuboid,
  Table,
  FolderTree,
  PackageMinus,
  PackageOpen,
  PackagePlus,
  Ruler,
  ShelvingUnit,
  BellRing,
  ScrollText,
} from 'lucide-react';
import SidebarMenuItem from './SidebarMenuItem';
import SidebarMenuGroup from './SidebarMenuGroup';

export default function SidebarMenu() {
  return (
    <div className="drawer-side is-drawer-close:overflow-visible">
      <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
      <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-58">
        <ul className="menu w-full grow pt-3">
          {/* List item */}
          <SidebarMenuItem icon={Home} title="Dashboard" href="/" />
          <SidebarMenuGroup icon={ShelvingUnit} title="Inventario" href="/inventario">
            <SidebarMenuItem icon={Cuboid} title="Productos" href="/inventario/productos" />
            <SidebarMenuItem icon={FolderTree} title="Categorías" href="/inventario/categorias" />
            <SidebarMenuItem
              icon={Ruler}
              title="Unidades de Medida"
              href="/inventario/unidades-de-medida"
            />
            <SidebarMenuItem icon={PackageOpen} title="Lotes" href="/inventario/lotes" />
            <SidebarMenuItem
              icon={PackagePlus}
              title="Registrar Entrada"
              href="/inventario/registrar-entrada"
            />
            <SidebarMenuItem
              icon={PackageMinus}
              title="Registrar Salida"
              href="/inventario/registrar-salida"
            />
            <SidebarMenuItem icon={Table} title="Movimientos" href="/inventario/movimientos" />
          </SidebarMenuGroup>
          <SidebarMenuGroup icon={BellRing} title="Alertas" href="/alertas">
            <SidebarMenuItem icon={BellRing} title="Por vencer" href="/alertas/por-vencer" />
            <SidebarMenuItem icon={BellRing} title="Bajo stock" href="/alertas/bajo-stock" />
          </SidebarMenuGroup>
          <SidebarMenuItem icon={ScrollText} title="Reportes" href="/reportes" />
          <SidebarMenuItem icon={Settings} title="Configuración" href="/configuracion" />
        </ul>
      </div>
    </div>
  );
}
