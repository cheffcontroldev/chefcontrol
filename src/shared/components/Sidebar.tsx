import SidebarMenu from './SidebarMenu';
import SidebarNavBar from './SidebarNavBar';

export default function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <SidebarNavBar />
        {/* Page content here */}
        <div className="p-4">{children}</div>
      </div>
      <SidebarMenu />
    </div>
  );
}
