import {
  Home,
  Settings,
  Cuboid,
  Table,
  Plus,
  FolderTree,
  Ruler,
  ShelvingUnit,
  MoveUpRight,
  MoveDownRight,
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
      <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-70">
        <ul className="menu w-full grow pt-3">
          {/* List item */}
          <SidebarMenuItem icon={Home} title="Dashboard" />
          <SidebarMenuGroup icon={Cuboid} title="Productos">
            <SidebarMenuItem icon={Plus} title="Crear Producto" />
            <SidebarMenuItem icon={Table} title="Listado Productos" />
          </SidebarMenuGroup>
          <SidebarMenuGroup icon={FolderTree} title="Categorías">
            <SidebarMenuItem icon={Plus} title="Crear Categoría" />
            <SidebarMenuItem icon={Table} title="Listado Categorías" />
          </SidebarMenuGroup>
          <SidebarMenuGroup icon={Ruler} title="Unidades de Medida">
            <SidebarMenuItem icon={Plus} title="Crear Unidad de Medida" />
            <SidebarMenuItem icon={Table} title="Listado Unidades de Medida" />
          </SidebarMenuGroup>
          <SidebarMenuGroup icon={ShelvingUnit} title="Inventario">
            <SidebarMenuItem icon={MoveUpRight} title="Registrar Entrada" />
            <SidebarMenuItem icon={MoveDownRight} title="Registrar Salida" />
            <SidebarMenuItem icon={Table} title="Movimientos" />
          </SidebarMenuGroup>
          <SidebarMenuItem icon={BellRing} title="Alertas" />
          <SidebarMenuItem icon={ScrollText} title="Reportes" />
          <SidebarMenuItem icon={Settings} title="Configuración" />
          <SidebarMenuItem icon={LogOut} title="Cerrar Sesión" />
        </ul>
      </div>
    </div>
  );
}
