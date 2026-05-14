import UserList from '@/features/users/components/UserList';
import { usePageTitle } from '@/shared/hooks/usePageTitle';

export default function UsersPage() {
  usePageTitle('Usuarios');
  return <UserList />;
}
