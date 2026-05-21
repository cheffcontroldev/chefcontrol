import SettingsMenu from '@/features/settings/components/SettingsMenu';
import { usePageTitle } from '@/shared/hooks/usePageTitle';

/** Page component for the settings hub — navigation to settings sub-features. */
export default function SettingsPage() {
  usePageTitle('Configuración');
  return <SettingsMenu />;
}
