import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormModal from '@/shared/components/FormModal';
import { useUiStore } from '@/stores/uiStore';
import { createCategorySchema, type CreateCategoryInput } from '../schemas';
import { useCreateCategory } from '../hooks/useCreateCategory';
import Input from '@/shared/components/Input';
import TextArea from '@/shared/components/TextArea';
import type { FormMode } from '@/shared/types';

export default function CategoryForm() {
  const { categoryFormMode, setCategoryFormMode } = useUiStore();

  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<CreateCategoryInput>({
    resolver: zodResolver(createCategorySchema),
    mode: 'onBlur',
  });

  const { mutate, isPending } = useCreateCategory({ resetForm });

  const onFormButtonActions = (action: FormMode) => {
    if (action === 'hidden' || action === 'create') {
      resetForm();
    }
    setCategoryFormMode(action);
  };

  const onSubmit = (data: CreateCategoryInput) => {
    mutate(data, {
      onSuccess: () => {
        resetForm();
        setCategoryFormMode('hidden');
      },
    });
  };

  if (categoryFormMode === 'hidden') return null;

  return (
    <FormModal
      formMode={categoryFormMode}
      onFormButtonActions={onFormButtonActions}
      onSubmit={handleSubmit(onSubmit)}
      isPending={isPending}
    >
      <Input
        type="text"
        placeholder="Nombre Completo"
        {...register('name')}
        errorMessage={errors.name?.message}
        readOnly={categoryFormMode === 'show'}
      />
      <TextArea
        placeholder="Descripción"
        {...register('description')}
        readOnly={categoryFormMode === 'show'}
      />
    </FormModal>
  );
}
