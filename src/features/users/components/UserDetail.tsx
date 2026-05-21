import { useUser } from '../hooks/useUser';
import { useUiStore } from '@/stores/uiStore';
import {
  User,
  Mail,
  Shield,
  CalendarDays,
  Pencil,
  KeyRound,
  AlertTriangle,
  UserCircle,
  Clock,
} from 'lucide-react';

import { formatDate } from '@/shared/utils/dataHelpers';

/**
 * Loading skeleton displayed while the user profile is being fetched.
 */
function Skeleton() {
  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <div className="skeleton h-24 w-24 rounded-full mx-auto"></div>
      <div className="skeleton h-6 w-48 mx-auto"></div>
      <div className="skeleton h-4 w-32 mx-auto"></div>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body space-y-3">
          <div className="skeleton h-12 w-full"></div>
          <div className="skeleton h-12 w-full"></div>
          <div className="skeleton h-12 w-full"></div>
          <div className="skeleton h-12 w-full"></div>
        </div>
      </div>
    </div>
  );
}

/**
 * Page that displays the current user's profile information.
 *
 * Shows name, email, role, and creation date in a read-only card. Two buttons
 * at the bottom open modals to edit the user's name or update their password.
 */
export default function UserDetail() {
  const { data: user, isLoading, error } = useUser();
  const { setUserFormMode, setUserPasswordUpdateFormMode } = useUiStore();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Skeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="alert alert-error shadow-lg max-w-md">
          <AlertTriangle className="w-6 h-6" />
          <div>
            <h3 className="font-bold">Error al cargar perfil</h3>
            <p>{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  const roleBadgeColor =
    user?.role === 'Administrador'
      ? 'badge-primary'
      : user?.role === 'Almacén'
        ? 'badge-secondary'
        : 'badge-accent';

  return (
    <div className="w-full max-w-lg mx-auto py-8 space-y-6">
      {/* Header con avatar */}
      <div className="text-center space-y-3">
        <div className="avatar placeholder mx-auto">
          <div className="bg-primary/10 text-primary rounded-full w-24 h-24 ring-4 ring-primary/20">
            <UserCircle className="w-12 h-12" />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold">{user?.name}</h2>
          <p className="text-base-content/60 flex items-center justify-center gap-1.5">
            <Mail className="w-4 h-4" />
            {user?.email}
          </p>
        </div>
        <span className={`badge badge-lg gap-1 ${roleBadgeColor}`}>
          <Shield className="w-4 h-4" />
          {user?.role}
        </span>
      </div>

      {/* Card de información */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body space-y-4">
          <h3 className="card-title text-lg flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Información del perfil
          </h3>
          <div className="divider my-0"></div>

          {/* Nombre */}
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <User className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm text-base-content/60">Nombre completo</p>
                <p className="font-medium">{user?.name}</p>
              </div>
            </div>
          </div>

          {/* Correo */}
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-info/10 rounded-lg">
                <Mail className="w-4 h-4 text-info" />
              </div>
              <div>
                <p className="text-sm text-base-content/60">Correo electrónico</p>
                <p className="font-medium">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Rol */}
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <Shield className="w-4 h-4 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-base-content/60">Rol asignado</p>
                <p className="font-medium">{user?.role}</p>
              </div>
            </div>
            <span className={`badge badge-sm ${roleBadgeColor}`}>{user?.role}</span>
          </div>

          {/* Fecha de creación */}
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <CalendarDays className="w-4 h-4 text-accent" />
              </div>
              <div>
                <p className="text-sm text-base-content/60">Miembro desde</p>
                <p className="font-medium flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-base-content/40" />
                  {formatDate(user?.createdAt ?? '')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Acciones */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="button"
          className="btn btn-primary gap-2 w-full sm:w-auto"
          onClick={() => setUserFormMode(true)}
        >
          <Pencil className="w-4 h-4" />
          Editar perfil
        </button>
        <button
          type="button"
          className="btn btn-outline btn-info gap-2 w-full sm:w-auto"
          onClick={() => setUserPasswordUpdateFormMode(true)}
        >
          <KeyRound className="w-4 h-4" />
          Actualizar contraseña
        </button>
      </div>
    </div>
  );
}
