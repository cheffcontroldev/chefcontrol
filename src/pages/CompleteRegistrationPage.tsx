import { usePageTitle } from '@/shared/hooks/usePageTitle';
import { CompleteRegistrationForm } from '@/features/auth/components/CompleteRegistrationForm';

export default function CompleteRegistrationPage() {
  usePageTitle('Completar Registro');
  return <CompleteRegistrationForm />;
}
