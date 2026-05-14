import { useUsers } from '../hooks/useUsers';
import { TableColumnActions } from '@/shared/components/TableColumnActions';

export default function UserList() {
  const { data: users, isLoading, error } = useUsers();
  return (
    <div className="overflow-x-auto w-full max-w-7xl">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th className="hidden">Id</th>
            <th>Nombre</th>
            <th className="max-sm:hidden">Email</th>
            <th className="max-md:hidden">Rol</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={5} className="text-center">
                Cargando...
              </td>
            </tr>
          )}
          {error && (
            <tr>
              <td colSpan={5} className="text-center">
                Error: {error.message}
              </td>
            </tr>
          )}
          {users.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center">
                No se encontraron usuarios
              </td>
            </tr>
          )}
          {users?.map((user) => (
            <tr key={user.id} className="hover:bg-base-300">
              <th className="hidden">{user.id.toString().slice(0, 8)}...</th>
              <td>{user.name}</td>
              <td className="max-sm:hidden">{user.email}</td>
              <td className="max-md:hidden">{user.role}</td>
              <td>
                <TableColumnActions />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
