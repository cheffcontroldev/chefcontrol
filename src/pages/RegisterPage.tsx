import { usePageTitle } from '@/shared/hooks/usePageTitle';

import RegisterForm from '@/features/auth/components/RegisterForm';

export default function RegisterPage() {
  usePageTitle('Registrarse');
  return <RegisterForm />;
}
