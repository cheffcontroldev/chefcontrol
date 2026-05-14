import SettingsMenu from '@/features/settings/components/SettingsMenu';
import { usePageTitle } from '@/shared/hooks/usePageTitle';

export default function SettingsPage() {
  usePageTitle('Configuración');
  return <SettingsMenu />;
}
