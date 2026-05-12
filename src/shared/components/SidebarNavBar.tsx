import { PanelRightClose, UserPlus, LogIn } from 'lucide-react';

export default function SidebarNavBar() {
  return (
    <nav className="navbar w-full bg-base-300 flex justify-between">
      <div className="flex items-center justify-items-start">
        <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
          {/* Sidebar toggle icon */}
          <PanelRightClose className="my-1.5 inline-block size-4" />
        </label>
        <div className="px-4">Navbar Title</div>
      </div>
      <div className="space-x-3">
        <button className="btn btn-xs btn-primary">
          <UserPlus className="size-4" />
          <span className="hidden">Registrarse</span>
        </button>
        <button className="btn btn-xs btn-secondary">
          <LogIn className="size-4" />
          <span className="hidden">Iniciar sesión</span>
        </button>
      </div>
    </nav>
  );
}
