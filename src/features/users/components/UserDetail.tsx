import { useUser } from '../hooks/useUser';
import { useUiStore } from '@/stores/uiStore';

import { formatDate } from '@/shared/utils/dataHelpers';

/**
 * Loading skeleton displayed while the user profile is being fetched.
 */
function Skeleton() {
  return (
    <div className="flex w-52 flex-col gap-4">
      <div className="skeleton h-32 w-full"></div>
      <div className="skeleton h-4 w-28"></div>
      <div className="skeleton h-4 w-full"></div>
      <div className="skeleton h-4 w-full"></div>
    </div>
  );
}

/**
 * Page that displays the current user's profile information.
 *
 * Shows name, email, role, and creation date in a read-only table. Two buttons
 * at the bottom open modals to edit the user's name or update their password.
 */
export default function UserDetail() {
  const { data: user, isLoading, error } = useUser();
  const { setUserFormMode, setUserPasswordUpdateFormMode } = useUiStore();

  if (isLoading) {
    return <Skeleton />;
  }

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  return (
    <div className="py-6 w-full">
      <table className="w-full max-w-md mx-auto border border-base-300">
        <tbody>
          <tr>
            <td className="font-semibold min-w-1/2 p-3">Nombre:</td>
            <td className="p-3">{user?.name}</td>
          </tr>
          <tr>
            <td className="font-semibold min-w-1/2 p-3">Correo:</td>
            <td className="p-3">{user?.email}</td>
          </tr>
          <tr>
            <td className="font-semibold min-w-1/2 p-3">Rol:</td>
            <td className="p-3">{user?.role}</td>
          </tr>
          <tr>
            <td className="font-semibold min-w-1/2 p-3">Fecha de creación:</td>
            <td className="p-3">{formatDate(user?.createdAt)}</td>
          </tr>
        </tbody>
      </table>
      <div className="flex items-center justify-center gap-2 mt-4">
        <button className="btn btn-primary" onClick={() => setUserFormMode(true)}>
          Editar
        </button>
        <button className="btn btn-info" onClick={() => setUserPasswordUpdateFormMode(true)}>
          Actualizar contraseña
        </button>
      </div>
    </div>
  );
}
