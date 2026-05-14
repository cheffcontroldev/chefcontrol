import { UsersRound } from 'lucide-react';
import SettingsMenuItem from './SettingsMenuItem';

export default function SettingsMenu() {
  return (
    <div className="px-3 w-full max-w-6xl justify-center flex gap-4 flex-wrap">
      <SettingsMenuItem icon={UsersRound} title="Usuarios" href="/configuracion/usuarios" />
    </div>
  );
}
