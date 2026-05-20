import { useRestaurant } from '../hooks/useRestaurant';

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

export default function RestaurantDetail() {
  const { data: restaurant, isLoading, error } = useRestaurant();
  const { setRestaurantFormMode } = useUiStore();

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
            <td className="p-3">{restaurant?.name}</td>
          </tr>
          <tr>
            <td className="font-semibold min-w-1/2 p-3">Correo:</td>
            <td className="p-3">{restaurant?.email}</td>
          </tr>
          <tr>
            <td className="font-semibold min-w-1/2 p-3">Teléfono:</td>
            <td className="p-3">{restaurant?.phone}</td>
          </tr>
          <tr>
            <td className="font-semibold min-w-1/2 p-3">Dirección:</td>
            <td className="p-3">{restaurant?.address}</td>
          </tr>
          <tr>
            <td className="font-semibold min-w-1/2 p-3">Fecha de creación:</td>
            <td className="p-3">{formatDate(restaurant?.createdAt)}</td>
          </tr>
          <tr>
            <td className="font-semibold min-w-1/2 p-3">Activo:</td>
            <td className={`p-3 ${restaurant?.isActive ? 'text-success' : 'text-error'}`}>
              {restaurant?.isActive ? 'Sí' : 'No'}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="flex items-center justify-center gap-2 mt-4">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setRestaurantFormMode(true)}
        >
          Editar
        </button>
      </div>
    </div>
  );
}
