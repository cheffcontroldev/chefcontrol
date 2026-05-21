import UserDetail from '@/features/users/components/UserDetail';
import UserForm from '@/features/users/components/UserForm';
import UserUpdatePasswordForm from '@/features/users/components/UserUpdatePasswordForm';
import { usePageTitle } from '@/shared/hooks/usePageTitle';

/** Page component for user profile: detail view, edit form, and password update. */
export default function UsersPage() {
  usePageTitle('Detalle de usuario');
  return (
    <>
      <UserDetail />
      <UserForm />
      <UserUpdatePasswordForm />
    </>
  );
}
