import UserDetail from '@/features/users/components/UserDetail';
import { usePageTitle } from '@/shared/hooks/usePageTitle';

export default function UsersPage() {
  usePageTitle('Detalle de usuario');
  return (
    <>
      <UserDetail />
    </>
  );
}
