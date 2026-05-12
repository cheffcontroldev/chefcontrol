import { PanelRightClose } from 'lucide-react';

export default function SidebarNavBar() {
  return (
    <nav className="navbar w-full bg-base-300">
      <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
        {/* Sidebar toggle icon */}
        <div>
          <PanelRightClose className="my-1.5 inline-block size-4" />
        </div>
      </label>
      <div className="px-4">Navbar Title</div>
    </nav>
  );
}
