import { usePageTitle } from '@/shared/hooks/usePageTitle';
import CompleteRegistrationForm from '@/features/auth/components/CompleteRegistrationForm';

/** Page component for completing the initial registration (e.g. restaurant setup). */
export default function CompleteRegistrationPage() {
  usePageTitle('Completar Registro');
  return <CompleteRegistrationForm />;
}
