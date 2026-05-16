import { UsersRound } from 'lucide-react';
import BigMenuItem from '@/shared/components/BigMenuItem';

export default function SettingsMenu() {
  return (
    <div className="px-3 w-full max-w-6xl justify-center flex gap-4 flex-wrap">
      <BigMenuItem icon={UsersRound} title="Usuarios" href="/configuracion/usuarios" />
    </div>
  );
}
