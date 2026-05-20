import { UsersRound, Utensils } from 'lucide-react';
import BigMenuItem from '@/shared/components/BigMenuItem';

export default function SettingsMenu() {
  return (
    <div className="px-3 w-full max-w-6xl justify-center flex gap-4 flex-wrap">
      <BigMenuItem icon={UsersRound} title="Detalles de Usuario" href="/configuracion/usuarios" />
      <BigMenuItem
        icon={Utensils}
        title="Detalles del Restaurante"
        href="/configuracion/restaurant"
      />
    </div>
  );
}
