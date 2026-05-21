import { usePageTitle } from '@/shared/hooks/usePageTitle';

import RegisterForm from '@/features/auth/components/RegisterForm';

/** Page component for the user registration screen. */
export default function RegisterPage() {
  usePageTitle('Registrarse');
  return <RegisterForm />;
}
