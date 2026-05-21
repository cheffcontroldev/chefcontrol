import { usePageTitle } from '@/shared/hooks/usePageTitle';
import LoginForm from '../features/auth/components/LoginForm';

/** Page component for the login screen. */
export default function LoginPage() {
  usePageTitle('Iniciar Sesión');
  return <LoginForm />;
}
