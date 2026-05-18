/* Hooks */
import { useMovements } from '../hooks/useMovements';

import { formatDate } from '@/shared/utils/formatDate';

export default function MovementList() {
  const { data: movements, isLoading, error } = useMovements();
  const countMovements = movements?.length || 0;

  return (
    <div className="overflow-x-auto w-full min-w-[340px] max-w-7xl">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Producto</th>
            <th>Tipo</th>
            <th className="max-md:hidden">Cantidad</th>
            <th className="max-lg:hidden">Fecha</th>
            <th className="max-sm:hidden">Cancelado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={8} className="text-center">
                Cargando...
              </td>
            </tr>
          )}
          {error && (
            <tr>
              <td colSpan={8} className="text-center">
                Error: {error.message}
              </td>
            </tr>
          )}
          {countMovements === 0 && (
            <tr>
              <td colSpan={8} className="text-center">
                No se encontraron movimientos
              </td>
            </tr>
          )}
          {movements?.map((movement) => (
            <tr key={movement.id} className="hover:bg-base-300">
              <td>{movement.product.name}</td>
              <td>{movement.type === 'entry' ? 'Entrada' : 'Salida'}</td>
              <td className="max-md:hidden">{movement.quantity}</td>
              <td className="max-lg:hidden">{formatDate(movement.movementDate.toString())}</td>
              <td className="max-sm:hidden">{movement.isCancelled ? 'Sí' : 'No'}</td>
              <td>
                <button className="btn btn-ghost btn-xs">Ver</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
