import ModalConfirmDelete from './ModalConfirmDelete';
import SidebarMenu from './SidebarMenu';
import SidebarNavBar from './SidebarNavBar';

/**
 * Main layout shell with sidebar and navbar.
 * @description The authenticated app shell combining:
 * - SidebarNavBar (top navigation)
 * - SidebarMenu (collapsible sidebar)
 * - ModalConfirmDelete (global delete confirmation)
 *
 * Note: Alert was moved to App.tsx (rendered outside Router) so
 * notifications display globally above all routes.
 *
 * Uses DaisyUI drawer for responsive sidebar behavior.
 *
 * @example
 * ```tsx
 * <Sidebar>
 *   <DashboardPage />
 * </Sidebar>
 * ```
 *
 * @param children - Page content rendered in the main area
 */
export default function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <SidebarNavBar />
        {/* Page content here */}
        <div className="p-4 min-h-[calc(100vh-4.5rem)] flex justify-center relative">
          {children}
          <ModalConfirmDelete />
        </div>
      </div>
      <SidebarMenu />
    </div>
  );
}
