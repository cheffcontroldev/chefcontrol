import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { createMovementExitSchema, type CreateExitMovement } from '../schemas';

/* Hooks */
import { useCreateMovementExit } from '../hooks/useCreateMovementExit';
import { useProducts } from '@/features/products/hooks/useProducts';

/* Shared Components */
import Input from '@/shared/components/Input';
import Select from '@/shared/components/Select';
import TextArea from '@/shared/components/TextArea';

export default function MovementExitForm() {
  const { data: products, isLoading: isLoadingProducts, error: productsError } = useProducts();

  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<CreateExitMovement>({
    resolver: zodResolver(createMovementExitSchema),
    mode: 'onBlur',
    defaultValues: {
      productId: '',
      reason: '',
      quantity: 0,
      notes: '',
    },
  });

  useEffect(() => {
    resetForm({
      productId: '',
      quantity: 0,
      reason: '',
      notes: '',
    });
  }, [resetForm]);

  const { mutate, isPending } = useCreateMovementExit({ resetForm });

  const productOptions = products?.reduce(
    (acc, product) => {
      acc[product.id] = product.name;
      return acc;
    },
    {} as Record<string, string>
  );

  const onSubmit = (data: CreateExitMovement) => {
    mutate(data, {
      onSuccess: () => {},
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm pt-12 space-y-3">
      <Select
        placeholder="Producto"
        options={productOptions}
        {...register('productId')}
        errorMessage={errors.productId?.message}
        isLoadingOptions={isLoadingProducts}
        isErrorOptions={!!productsError}
      />

      <Input
        type="text"
        placeholder="Motivo"
        {...register('reason')}
        errorMessage={errors.reason?.message}
        readOnly={isPending}
      />

      <p className="pt-3 text-sm">Unidad de medida:</p>
      <Input
        type="number"
        placeholder="Cantidad"
        {...register('quantity', { valueAsNumber: true })}
        errorMessage={errors.quantity?.message}
        readOnly={isPending}
      />

      <TextArea placeholder="Notas" {...register('notes')} readOnly={isPending} />

      <div className="pt-6 flex items-center justify-center">
        <button type="submit" className="btn btn-success">
          Crear salida
        </button>
      </div>
    </form>
  );
}
