import { useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { createMovementExitSchema, type CreateExitMovement } from '../schemas';

/* Hooks */
import { useCreateMovementExit } from '../hooks/useCreateMovementExit';
import { useLots } from '@/features/lots/hooks/useLots';

/* Shared Components */
import Input from '@/shared/components/Input';
import Select from '@/shared/components/Select';
import TextArea from '@/shared/components/TextArea';

/**
 * Form for creating an exit (stock-out) movement.
 *
 * Product options are derived from available lots (only products with stock > 0
 * appear). On successful submission the form resets.
 */
export default function MovementExitForm() {
  const { data: lots, isLoading: isLoadingLots, error: lotsError } = useLots();

  const productOptions = useMemo(() => {
    if (!lots) return {};
    return lots.reduce(
      (acc, lot) => {
        const productId = lot.product.id;
        const productName = lot.product.name;
        if (!acc[productId]) {
          acc[productId] = productName;
        }
        return acc;
      },
      {} as Record<string, string>
    );
  }, [lots]);

  const {
    register,
    handleSubmit,
    reset: resetForm,
    control,
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

  const selectedProductId = useWatch({
    control,
    name: 'productId',
  });

  const selectedProduct = useMemo(() => {
    return lots?.find((lot) => lot.product.id === selectedProductId)?.product;
  }, [lots, selectedProductId]);

  const unitAbbreviation = selectedProduct?.unitsOfMeasure?.name || '—';

  const { mutate, isPending } = useCreateMovementExit({ resetForm });

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
        isLoadingOptions={isLoadingLots}
        isErrorOptions={!!lotsError}
      />

      <Input
        type="text"
        placeholder="Motivo"
        {...register('reason')}
        errorMessage={errors.reason?.message}
        readOnly={isPending}
      />

      <Input
        type="number"
        placeholder="Cantidad"
        {...register('quantity', { valueAsNumber: true })}
        errorMessage={errors.quantity?.message}
        readOnly={isPending}
      />

      <p className="-mt-6 pb-3 text-sm text-base-content/70">
        Unidad de medida: <span className="font-medium text-base-content">{unitAbbreviation}</span>
      </p>

      <TextArea placeholder="Notas" {...register('notes')} readOnly={isPending} />

      <div className="pt-6 flex items-center justify-center">
        <button type="submit" className="btn btn-success" disabled={isPending}>
          Crear salida
        </button>
      </div>
    </form>
  );
}
