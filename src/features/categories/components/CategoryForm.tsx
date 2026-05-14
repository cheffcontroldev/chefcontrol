import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

/* Components */
import FormModal from '@/shared/components/FormModal';

/* States */
import { useUiStore } from '@/stores/uiStore';
import { useCategoryStore } from '../store/CategoryStore';

/* Schemas */
import {
  createCategorySchema,
  updateCategorySchema,
  type CreateCategoryInput,
  type UpdateCategoryInput,
} from '../schemas';

/* Hooks */
import { useCreateCategory } from '../hooks/useCreateCategory';
import { useUpdateCategory } from '../hooks/useUpdateCategory';

/* Shared Components */
import Input from '@/shared/components/Input';
import TextArea from '@/shared/components/TextArea';
import type { FormMode } from '@/shared/types';

export default function CategoryForm() {
  const { categoryFormMode, setCategoryFormMode } = useUiStore();
  const { selectedCategory, setSelectedCategory } = useCategoryStore();

  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<CreateCategoryInput | UpdateCategoryInput>({
    resolver: zodResolver(selectedCategory ? updateCategorySchema : createCategorySchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      description: '',
    },
  });

  useEffect(() => {
    if (selectedCategory) {
      resetForm({
        name: selectedCategory.name,
        description: selectedCategory.description || '',
      });
    } else {
      resetForm({
        name: '',
        description: '',
      });
    }
  }, [selectedCategory, resetForm]);

  const { mutate: createMutate, isPending: isCreating } = useCreateCategory({ resetForm });
  const { mutate: updateMutate, isPending: isUpdating } = useUpdateCategory({ resetForm });

  const onFormButtonActions = (action: FormMode) => {
    if (action === 'hidden' || action === 'create') {
      resetForm();
      setSelectedCategory(null);
    } else if (action === 'show') {
      resetForm({
        name: selectedCategory.name,
        description: selectedCategory.description || '',
      });
    }
    setCategoryFormMode(action);
  };

  const onSubmit = (data: CreateCategoryInput) => {
    if (selectedCategory) {
      const { id } = selectedCategory || null;
      const dto = data as CreateCategoryInput;
      updateMutate(
        { id, input: dto },
        {
          onSuccess: () => {
            resetForm();
            setCategoryFormMode('hidden');
          },
        }
      );
    } else {
      createMutate(data, {
        onSuccess: () => {
          resetForm();
          setCategoryFormMode('hidden');
        },
      });
    }
  };

  if (categoryFormMode === 'hidden') return null;

  return (
    <FormModal
      formMode={categoryFormMode}
      onFormButtonActions={onFormButtonActions}
      onSubmit={handleSubmit(onSubmit)}
      isPending={isCreating || isUpdating}
    >
      <Input
        type="text"
        placeholder="Nombre Completo"
        {...register('name')}
        errorMessage={errors.name?.message}
        readOnly={categoryFormMode === 'show' || isCreating || isUpdating}
      />
      <TextArea
        placeholder="Descripción"
        {...register('description')}
        readOnly={categoryFormMode === 'show' || isCreating || isUpdating}
      />
    </FormModal>
  );
}
