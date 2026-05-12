import { usePageTitle } from '@/shared/hooks/usePageTitle';
import LoginForm from '../features/auth/components/LoginForm';

export default function LoginPage() {
  usePageTitle('Iniciar Sesión');
  return <LoginForm />;
}
