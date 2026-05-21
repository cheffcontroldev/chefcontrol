import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

/* Components */
import FormModalUserRestaurant from '@/shared/components/FormModalUserRestaurant';

/* States */
import { useUiStore } from '@/stores/uiStore';

/* Hooks */
import { useUser } from '../hooks/useUser';
import { useUpdateMyUser } from '../hooks/useUpdateMyUser';

/* Schemas */
import { updateUserSchema, type UpdateUserInput } from '../schemas';

/* Shared Components */
import Input from '@/shared/components/Input';

/**
 * Modal form for editing the current user's display name.
 *
 * Pre-fills the input with the current user name on mount. On successful
 * update the modal closes via the mutation's `onSuccess` callback.
 */
export default function UserForm() {
  const { userFormMode, setUserFormMode } = useUiStore();
  const { data: user, isLoading: isUserLoading } = useUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateUserInput>({
    resolver: zodResolver(updateUserSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
      });
    }
  }, [user, reset]);

  const { mutate: updateMutate, isPending: isUpdating } = useUpdateMyUser();

  const onSubmit = (data: UpdateUserInput) => {
    updateMutate(data, {
      onSuccess: () => {
        setUserFormMode(false);
      },
    });
  };

  const handleClose = () => {
    reset();
    setUserFormMode(false);
  };

  if (!userFormMode) return null;

  return (
    <FormModalUserRestaurant
      formMode="edit"
      hideForm={handleClose}
      onSubmit={handleSubmit(onSubmit)}
      isPending={isUpdating || isUserLoading}
    >
      <Input
        type="text"
        placeholder="Nombre Completo"
        {...register('name')}
        errorMessage={errors.name?.message}
        readOnly={isUpdating}
      />
      <Input
        type="email"
        placeholder="Correo Electrónico"
        {...register('email')}
        errorMessage={errors.email?.message}
        readOnly={isUpdating}
      />
    </FormModalUserRestaurant>
  );
}
