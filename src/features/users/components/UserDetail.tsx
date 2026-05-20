import { useUser } from '../hooks/useUser';
import { useUiStore } from '@/stores/uiStore';

import { formatDate } from '@/shared/utils/dataHelpers';

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

export default function UserDetail() {
  const { data: user, isLoading, error } = useUser();
  const { setUserFormMode } = useUiStore();

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
        <button className="btn btn-info">Actualizar contraseña</button>
      </div>
    </div>
  );
}
