// shared/components/SidebarNavBar.tsx
import { Link } from 'wouter';
import { PanelRightClose, UserPlus, LogIn, LogOut, User } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { useUiStore } from '@/stores/uiStore';
import { useSignOut } from '@/features/auth/hooks/useSignOut';

export default function SidebarNavBar() {
  const titlePage = useUiStore((state) => state.titlePage);
  const { isAuthenticated, user } = useAuthStore();
  const { mutate: signOut } = useSignOut();

  return (
    <nav className="navbar w-full bg-base-300 flex justify-between">
      <div className="flex items-center justify-items-start">
        <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
          <PanelRightClose className="my-1.5 inline-block size-4" />
        </label>
        <div className="px-4">{titlePage}</div>
      </div>

      <div className="space-x-3 flex items-center">
        {!isAuthenticated ? (
          // No autenticado: mostrar login y registro
          <>
            <Link to="/registrarse" className="btn btn-xs btn-primary">
              <UserPlus className="size-4" />
              <span className="hidden md:block">Registrarse</span>
            </Link>
            <Link to="/ingresar" className="btn btn-xs btn-success">
              <LogIn className="size-4" />
              <span className="hidden md:block">Iniciar sesión</span>
            </Link>
          </>
        ) : (
          // Autenticado: mostrar usuario y logout
          <>
            <div className="flex items-center gap-2 px-3">
              <User className="size-4" />
              {/* <span className="hidden md:block text-sm">{user?.name}</span> */}
              <span className="badge badge-sm badge-outline">{user?.role}</span>
            </div>
            <button className="btn btn-xs btn-error" onClick={() => signOut()}>
              <LogOut className="size-4" />
              <span className="hidden md:block">Cerrar Sesión</span>
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
