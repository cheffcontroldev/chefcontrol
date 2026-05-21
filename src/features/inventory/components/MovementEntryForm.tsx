import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { createMovementEntrySchema, type CreateEntryMovement } from '../schemas';

/* Hooks */
import { useCreateMovementEntry } from '../hooks/useCreateMovementEntry';
import { useProducts } from '@/features/products/hooks/useProducts';

/* Shared Components */
import Input from '@/shared/components/Input';
import Select from '@/shared/components/Select';
import TextArea from '@/shared/components/TextArea';

/**
 * Form for creating an entry (stock-in) movement.
 *
 * The user selects a product, enters a provider, quantity, expiration date,
 * and optional notes. On successful submission the form resets.
 */
export default function MovementEntryForm() {
  const { data: products, isLoading: isLoadingProducts, error: productsError } = useProducts();

  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<CreateEntryMovement>({
    resolver: zodResolver(createMovementEntrySchema),
    mode: 'onBlur',
    defaultValues: {
      productId: '',
      provider: '',
      quantity: 0,
      expirationDate: new Date().toISOString().split('T')[0],
      notes: '',
    },
  });

  useEffect(() => {
    resetForm({
      productId: '',
      quantity: 0,
      expirationDate: new Date().toISOString().split('T')[0],
      notes: '',
    });
  }, [resetForm]);

  const { mutate, isPending } = useCreateMovementEntry({ resetForm });

  const productOptions = products?.reduce(
    (acc, product) => {
      acc[product.id] = product.name;
      return acc;
    },
    {} as Record<string, string>
  );

  const onSubmit = (data: CreateEntryMovement) => {
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
        placeholder="Proveedor"
        {...register('provider')}
        errorMessage={errors.quantity?.message}
        readOnly={isPending}
      />

      <Input
        type="number"
        placeholder="Cantidad"
        {...register('quantity', { valueAsNumber: true })}
        errorMessage={errors.quantity?.message}
        readOnly={isPending}
      />
      <p className="-mt-6 pb-3 text-sm">Unidad de medida:</p>

      <Input
        type="date"
        placeholder="Vencimiento"
        {...register('expirationDate')}
        errorMessage={errors.expirationDate?.message}
        readOnly={isPending}
      />

      <TextArea placeholder="Descripción" {...register('notes')} readOnly={isPending} />

      <div className="pt-6 flex items-center justify-center">
        <button type="submit" className="btn btn-success">
          Crear entrada
        </button>
      </div>
    </form>
  );
}
