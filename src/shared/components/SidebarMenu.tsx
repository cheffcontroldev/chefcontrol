import {
  Home,
  Settings,
  Cuboid,
  Table,
  FolderTree,
  Ruler,
  ShelvingUnit,
  BellRing,
  ScrollText,
  LogOut,
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
            <SidebarMenuItem icon={Table} title="Movimientos" href="/inventario/movimientos" />
          </SidebarMenuGroup>
          <SidebarMenuItem icon={BellRing} title="Alertas" href="/alertas" />
          <SidebarMenuItem icon={ScrollText} title="Reportes" href="/reportes" />
          <SidebarMenuItem icon={Settings} title="Configuración" href="/configuracion" />
          <SidebarMenuItem icon={LogOut} title="Cerrar Sesión" href="/cerrar-sesion" />
        </ul>
      </div>
    </div>
  );
}
