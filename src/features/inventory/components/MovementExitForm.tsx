import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { createMovementExitSchema, type CreateExitMovement } from '../schemas';

/* Hooks */
import { useCreateMovementExit } from '../hooks/useCreateMovementExit';
import { useLots } from '@/features/lots/hooks/useLots';

/* Shared Components */
import Input from '@/shared/components/Input';
import Select from '@/shared/components/Select';
import TextArea from '@/shared/components/TextArea';

export default function MovementExitForm() {
  const { data: lots, isLoading: isLoadingLots, error: lotsError } = useLots();

  // Calcular opciones de productos directamente con useMemo
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

  const { mutate, isPending } = useCreateMovementExit({ resetForm });

  const onSubmit = (data: CreateExitMovement) => {
    mutate(data, {
      onSuccess: () => {
        // Ejemplo: cerrar modal, mostrar notificación, etc.
        // Puedes llamar a una función prop onClose si la recibes
      },
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

      <p className="pt-3 text-sm">Unidad de medida:</p>
      {/* Nota: la unidad de medida debería mostrarse dinámicamente según el producto seleccionado, 
          pero por ahora la cantidad es un número genérico */}
      <Input
        type="number"
        placeholder="Cantidad"
        {...register('quantity', { valueAsNumber: true })}
        errorMessage={errors.quantity?.message}
        readOnly={isPending}
      />

      <TextArea placeholder="Notas" {...register('notes')} readOnly={isPending} />

      <div className="pt-6 flex items-center justify-center">
        <button type="submit" className="btn btn-success" disabled={isPending}>
          Crear salida
        </button>
      </div>
    </form>
  );
}
