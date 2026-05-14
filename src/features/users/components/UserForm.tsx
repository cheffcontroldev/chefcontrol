import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormModal from '@/shared/components/FormModal';
import { useUiStore } from '@/stores/uiStore';
import { createUserSchema, type CreateUserInput } from '../schemas';
import { useCreateUser } from '../hooks/useCreateUser';
import Input from '@/shared/components/Input';
import Select from '@/shared/components/Select';
import { roleOptions } from '@/shared/formOptions';
import type { FormMode } from '@/shared/types';

export default function UserForm() {
  const { userFormMode, setUserFormMode } = useUiStore();

  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
    mode: 'onBlur',
  });

  const { mutate, isPending } = useCreateUser({ resetForm });

  const onFormButtonActions = (action: FormMode) => {
    if (action === 'hidden' || action === 'create') {
      resetForm();
    }
    setUserFormMode(action);
  };

  const onSubmit = (data: CreateUserInput) => {
    mutate(data, {
      onSuccess: () => {
        resetForm();
        setUserFormMode('hidden');
      },
    });
  };

  if (userFormMode === 'hidden') return null;

  return (
    <FormModal
      formMode={userFormMode}
      onFormButtonActions={onFormButtonActions}
      onSubmit={handleSubmit(onSubmit)}
      isPending={isPending}
    >
      <Input
        type="text"
        placeholder="Nombre Completo"
        {...register('name')}
        errorMessage={errors.name?.message}
        readOnly={userFormMode === 'show'}
      />
      <Input
        type="email"
        placeholder="Email"
        {...register('email')}
        errorMessage={errors.email?.message}
        readOnly={userFormMode === 'show'}
      />
      <Input
        type="password"
        placeholder="Password"
        {...register('password')}
        errorMessage={errors.email?.message}
        readOnly={userFormMode === 'show'}
      />
      <Select
        options={roleOptions}
        placeholder="Rol"
        {...register('role')}
        errorMessage={errors.role?.message}
      />
    </FormModal>
  );
}
