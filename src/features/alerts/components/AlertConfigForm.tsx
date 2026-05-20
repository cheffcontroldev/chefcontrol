// features/alerts/components/AlertConfigForm.tsx
import { useState } from 'react';
import { useAlertConfig } from '../hooks/useAlertConfig';

export default function AlertConfigForm() {
  const { config, isLoading, updateDays, isUpdating } = useAlertConfig();
  const [days, setDays] = useState(config?.expiration_alert_days || 3);

  if (isLoading) return <div>Cargando...</div>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateDays(days);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="form-control w-full max-w-xs flex flex-col items-center gap-y-3"
    >
      <label className="label">
        <span className="label-text">Días de anticipación para vencimiento</span>
      </label>
      <div className="flex gap-2">
        <input
          type="number"
          min={1}
          max={30}
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="input input-bordered w-full min-w-[200px]"
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isUpdating || days === config?.expiration_alert_days}
        >
          {isUpdating ? 'Guardando...' : 'Guardar'}
        </button>
      </div>
      <label className="label text-center">
        <span className="label-text-alt">
          Se mostrarán alertas de productos que venzan en {days} días o menos
        </span>
      </label>
    </form>
  );
}
