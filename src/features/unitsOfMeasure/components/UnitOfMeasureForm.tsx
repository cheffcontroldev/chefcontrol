import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

/* Components */
import FormModal from '@/shared/components/FormModal';

/* States */
import { useUiStore } from '@/stores/uiStore';
import { useUnitOfMeasureStore } from '../store/UnitOfMeasureStore';

/* Schemas */
import {
  createUnitOfMeasureSchema,
  updateUnitOfMeasureSchema,
  type CreateUnitOfMeasureInput,
  type UpdateUnitOfMeasureInput,
} from '../schemas';

/* Hooks */
import { useCreateUnitOfMeasure } from '../hooks/useCreateUnitsOfMeasure';
import { useUpdateUnitOfMeasure } from '../hooks/useUpdateUnitsOfMeasure';

/* Shared Components */
import Input from '@/shared/components/Input';

/* Interfaces and Types */
import type { FormMode } from '@/shared/types';

/**
 * Modal form for creating, editing, and viewing a unit of measure.
 *
 * Switches between `createUnitOfMeasureSchema` and
 * `updateUnitOfMeasureSchema` depending on whether one is selected. In
 * `'show'` mode all fields are read-only.
 */
export default function UnitOfMeasureForm() {
  const { unitOfMeasureFormMode, setUnitOfMeasureFormMode } = useUiStore();
  const { selectedUnitOfMeasure, setSelectedUnitOfMeasure } = useUnitOfMeasureStore();

  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<CreateUnitOfMeasureInput | UpdateUnitOfMeasureInput>({
    resolver: zodResolver(
      selectedUnitOfMeasure ? updateUnitOfMeasureSchema : createUnitOfMeasureSchema
    ),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      abbreviation: '',
    },
  });

  useEffect(() => {
    if (selectedUnitOfMeasure) {
      resetForm({
        name: selectedUnitOfMeasure.name,
        abbreviation: selectedUnitOfMeasure.abbreviation || '',
      });
    } else {
      resetForm({
        name: '',
        abbreviation: '',
      });
    }
  }, [selectedUnitOfMeasure, resetForm]);

  const { mutate: createMutate, isPending: isCreating } = useCreateUnitOfMeasure({ resetForm });
  const { mutate: updateMutate, isPending: isUpdating } = useUpdateUnitOfMeasure({ resetForm });

  const onFormButtonActions = (action: FormMode) => {
    if (action === 'hidden' || action === 'create') {
      resetForm();
      setSelectedUnitOfMeasure(null);
    } else if (action === 'show') {
      resetForm({
        name: selectedUnitOfMeasure?.name ?? '',
        abbreviation: selectedUnitOfMeasure?.abbreviation ?? '',
      });
    }
    setUnitOfMeasureFormMode(action);
  };

  const onSubmit = (data: CreateUnitOfMeasureInput) => {
    if (selectedUnitOfMeasure) {
      const { id } = selectedUnitOfMeasure || null;
      const dto = data as CreateUnitOfMeasureInput;
      updateMutate(
        { id, input: dto },
        {
          onSuccess: () => {
            resetForm();
            setUnitOfMeasureFormMode('hidden');
          },
        }
      );
    } else {
      createMutate(data, {
        onSuccess: () => {
          resetForm();
          setUnitOfMeasureFormMode('hidden');
        },
      });
    }
  };

  if (unitOfMeasureFormMode === 'hidden') return null;

  return (
    <FormModal
      formMode={unitOfMeasureFormMode}
      onFormButtonActions={onFormButtonActions}
      onSubmit={handleSubmit(onSubmit)}
      isPending={isCreating || isUpdating}
    >
      <Input
        type="text"
        placeholder="Nombre Completo"
        {...register('name')}
        errorMessage={errors.name?.message}
        readOnly={unitOfMeasureFormMode === 'show' || isCreating || isUpdating}
      />
      <Input
        type="text"
        placeholder="Abreviatura"
        {...register('abbreviation')}
        errorMessage={errors.abbreviation?.message}
        readOnly={unitOfMeasureFormMode === 'show' || isCreating || isUpdating}
      />
    </FormModal>
  );
}
