import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

/* Components */
import FormModalUserRestaurant from '@/shared/components/FormModalUserRestaurant';

/* States */
import { useUiStore } from '@/stores/uiStore';

/* Hooks */
import { useUpdateMyPassword } from '../hooks/useUpdateMyPassword';

/* Schemas */
import { updatePasswordSchema, type UpdatePasswordInput } from '../schemas';

/* Shared Components */
import Input from '@/shared/components/Input';

export default function UserUpdatePasswordForm() {
  const { userPasswordUpdateFormMode, setUserPasswordUpdateFormMode } = useUiStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdatePasswordInput>({
    resolver: zodResolver(updatePasswordSchema),
    mode: 'onBlur',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const { mutate: updatePasswordMutate, isPending: isUpdating } = useUpdateMyPassword();

  const onSubmit = (data: UpdatePasswordInput) => {
    updatePasswordMutate(data.password, {
      onSuccess: () => {
        setUserPasswordUpdateFormMode(false);
      },
    });
  };

  const handleClose = () => {
    reset();
    setUserPasswordUpdateFormMode(false);
  };

  if (!userPasswordUpdateFormMode) return null;

  return (
    <FormModalUserRestaurant
      formMode="edit"
      hideForm={handleClose}
      onSubmit={handleSubmit(onSubmit)}
      isPending={isUpdating}
    >
      <Input
        type="password"
        placeholder="Nueva contraseña"
        {...register('password')}
        errorMessage={errors.password?.message}
        readOnly={isUpdating}
      />
      <Input
        type="password"
        placeholder="Confirmar contraseña"
        {...register('confirmPassword')}
        errorMessage={errors.confirmPassword?.message}
        readOnly={isUpdating}
      />
    </FormModalUserRestaurant>
  );
}
