import { useRestaurant } from '../hooks/useRestaurant';
import { useUiStore } from '@/stores/uiStore';
import {
  Store,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  CheckCircle2,
  XCircle,
  Pencil,
  AlertTriangle,
  Clock,
  Building2,
} from 'lucide-react';

import { formatDate } from '@/shared/utils/dataHelpers';

/**
 * Loading skeleton displayed while the restaurant data is being fetched.
 */
function Skeleton() {
  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <div className="skeleton h-24 w-24 rounded-xl mx-auto"></div>
      <div className="skeleton h-6 w-48 mx-auto"></div>
      <div className="skeleton h-4 w-32 mx-auto"></div>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body space-y-3">
          <div className="skeleton h-12 w-full"></div>
          <div className="skeleton h-12 w-full"></div>
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
 * Page that displays the current restaurant's information.
 *
 * Shows name, email, phone, address, creation date, and active status in a
 * read-only card. An "Editar" button opens the restaurant form modal.
 */
export default function RestaurantDetail() {
  const { data: restaurant, isLoading, error } = useRestaurant();
  const { setRestaurantFormMode } = useUiStore();

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
            <h3 className="font-bold">Error al cargar restaurante</h3>
            <p>{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto py-8 space-y-6">
      {/* Header con avatar/ícono */}
      <div className="text-center space-y-3">
        <div className="avatar placeholder mx-auto">
          <div className="bg-primary/10 text-primary rounded-xl w-24 h-24 ring-4 ring-primary/20 flex items-center justify-center">
            <Building2 className="w-12 h-12" />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold">{restaurant?.name}</h2>
          <div className="flex items-center justify-center gap-2 mt-1">
            {restaurant?.isActive ? (
              <span className="badge badge-success badge-lg gap-1">
                <CheckCircle2 className="w-4 h-4" />
                Activo
              </span>
            ) : (
              <span className="badge badge-error badge-lg gap-1">
                <XCircle className="w-4 h-4" />
                Inactivo
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card de información */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body space-y-4">
          <h3 className="card-title text-lg flex items-center gap-2">
            <Store className="w-5 h-5 text-primary" />
            Información del restaurante
          </h3>
          <div className="divider my-0"></div>

          {/* Nombre */}
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Store className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm text-base-content/60">Nombre del negocio</p>
                <p className="font-medium">{restaurant?.name}</p>
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
                <p className="font-medium">{restaurant?.email}</p>
              </div>
            </div>
          </div>

          {/* Teléfono */}
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <Phone className="w-4 h-4 text-success" />
              </div>
              <div>
                <p className="text-sm text-base-content/60">Teléfono</p>
                <p className="font-medium">{restaurant?.phone || 'No registrado'}</p>
              </div>
            </div>
          </div>

          {/* Dirección */}
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <MapPin className="w-4 h-4 text-warning" />
              </div>
              <div>
                <p className="text-sm text-base-content/60">Dirección</p>
                <p className="font-medium">{restaurant?.address || 'No registrada'}</p>
              </div>
            </div>
          </div>

          {/* Fecha de creación */}
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <CalendarDays className="w-4 h-4 text-accent" />
              </div>
              <div>
                <p className="text-sm text-base-content/60">Registrado desde</p>
                <p className="font-medium flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-base-content/40" />
                  {formatDate(restaurant?.createdAt ?? '')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Acciones */}
      <div className="flex items-center justify-center">
        <button
          type="button"
          className="btn btn-primary gap-2"
          onClick={() => setRestaurantFormMode(true)}
        >
          <Pencil className="w-4 h-4" />
          Editar restaurante
        </button>
      </div>
    </div>
  );
}
