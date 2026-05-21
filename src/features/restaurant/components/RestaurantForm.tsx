import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

/* Components */
import FormModalUserRestaurant from '@/shared/components/FormModalUserRestaurant';

/* States */
import { useUiStore } from '@/stores/uiStore';

/* Hooks */
import { useRestaurant } from '../hooks/useRestaurant';
import { useUpdateRestaurant } from '../hooks/useUpdateRestaurant';

/* Schemas */
import { updateRestaurantSchema, type UpdateRestaurantInput } from '../schemas';

/* Shared Components */
import Input from '@/shared/components/Input';
import TextArea from '@/shared/components/TextArea';

/**
 * Modal form for editing restaurant details.
 *
 * Pre-fills with current restaurant data on mount. On success the modal closes
 * automatically.
 *
 * NOTE: This component is exported as `UserForm` instead of `RestaurantForm`.
 * The function name does not affect functionality but may cause confusion when
 * reading stack traces.
 */
export default function UserForm() {
  const { restaurantFormMode, setRestaurantFormMode } = useUiStore();
  const { data: restaurant, isLoading: isRestaurantLoading } = useRestaurant();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateRestaurantInput>({
    resolver: zodResolver(updateRestaurantSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
    },
  });

  useEffect(() => {
    if (restaurant) {
      reset({
        name: restaurant.name,
        email: restaurant.email,
        phone: restaurant.phone || '',
        address: restaurant.address || '',
      });
    }
  }, [restaurant, reset]);

  const { mutate: updateMutate, isPending: isUpdating } = useUpdateRestaurant();

  const onSubmit = (data: UpdateRestaurantInput) => {
    updateMutate(data, {
      onSuccess: () => {
        setRestaurantFormMode(false);
      },
    });
  };

  const handleClose = () => {
    reset();
    setRestaurantFormMode(false);
  };

  if (!restaurantFormMode) return null;

  return (
    <FormModalUserRestaurant
      formMode="edit"
      hideForm={handleClose}
      onSubmit={handleSubmit(onSubmit)}
      isPending={isUpdating || isRestaurantLoading}
    >
      <Input
        type="text"
        placeholder="Nombre del Restaurante"
        {...register('name')}
        errorMessage={errors.name?.message}
        readOnly={isUpdating}
      />

      <Input
        type="email"
        placeholder="Correo del Restaurante"
        {...register('email')}
        errorMessage={errors.email?.message}
        readOnly={isUpdating}
      />

      <Input
        type="tel"
        placeholder="Teléfono del Restaurante"
        {...register('phone')}
        errorMessage={errors.phone?.message}
        readOnly={isUpdating}
      />

      <TextArea {...register('address')} placeholder="Direccción" />
    </FormModalUserRestaurant>
  );
}
