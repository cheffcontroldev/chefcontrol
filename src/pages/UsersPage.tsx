import UserList from '@/features/users/components/UserList';
import UserForm from '@/features/users/components/UserForm';
import { usePageTitle } from '@/shared/hooks/usePageTitle';

export default function UsersPage() {
  usePageTitle('Usuarios');
  return (
    <>
      <UserList />
      <UserForm />
    </>
  );
}
