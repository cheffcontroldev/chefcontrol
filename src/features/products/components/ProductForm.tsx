import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

/* Components */
import FormModal from '@/shared/components/FormModal';

/* Schemas */
import {
  createProductSchema,
  updateProductSchema,
  type CreateProductInput,
  type UpdateProductInput,
} from '../schemas';

/* States */
import { useUiStore } from '@/stores/uiStore';
import { useProductStore } from '../store/ProductStore';

/* Hooks */
import { useCreateProduct } from '../hooks/useCreateProduct';
import { useUpdateProduct } from '../hooks/useUpdateProduct';
import { useCategories } from '@/features/categories/hooks/useCategories';

/* Shared Components */
import Input from '@/shared/components/Input';
import Select from '@/shared/components/Select';
import TextArea from '@/shared/components/TextArea';

/* Types */
import type { FormMode } from '@/shared/types';
import { useUnitsOfMeasure } from '@/features/unitsOfMeasure/hooks/useUnitsOfMeasure';

/**
 * Modal form for creating, editing, and viewing a product.
 *
 * Switches between `createProductSchema` and `updateProductSchema` depending
 * on whether a product is selected. In `'show'` mode all fields are read-only.
 *
 * Loads category and unit-of-measure options from their respective hooks for
 * the select inputs.
 */
export default function ProductForm() {
  const { productFormMode, setProductFormMode } = useUiStore();
  const { selectedProduct, setSelectedProduct } = useProductStore();
  const {
    data: categories,
    isLoading: isLoadingCategories,
    error: categoriesError,
  } = useCategories();
  const {
    data: unitsOfMeasure,
    isLoading: isLoadingUnitsOfMeasure,
    error: unitsOfMeasureError,
  } = useUnitsOfMeasure();

  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<CreateProductInput | UpdateProductInput>({
    resolver: zodResolver(selectedProduct ? updateProductSchema : createProductSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      description: '',
      skuCode: '',
      stockMinimum: 0,
      isActive: true,
    },
  });

  useEffect(() => {
    if (selectedProduct) {
      resetForm({
        name: selectedProduct.name,
        description: selectedProduct.description || '',
        skuCode: selectedProduct.skuCode || '',
        stockMinimum: selectedProduct.stockMinimum || 0,
      });
    } else {
      resetForm({
        name: '',
        description: '',
        skuCode: '',
        stockMinimum: 0,
      });
    }
  }, [selectedProduct, resetForm]);

  const { mutate: createMutate, isPending: isCreating } = useCreateProduct({ resetForm });
  const { mutate: updateMutate, isPending: isUpdating } = useUpdateProduct({ resetForm });

  const onFormButtonActions = (action: FormMode) => {
    if (action === 'hidden' || action === 'create') {
      resetForm();
      setSelectedProduct(null);
    } else if (action === 'show') {
      resetForm({
        name: selectedProduct?.name ?? '',
        description: selectedProduct?.description ?? '',
        skuCode: selectedProduct?.skuCode ?? '',
        stockMinimum: selectedProduct?.stockMinimum ?? 0,
      });
    }
    setProductFormMode(action);
  };

  const categoriesOptions = categories?.reduce(
    (acc, category) => {
      acc[category.id] = category.name;
      return acc;
    },
    {} as Record<string, string>
  );

  const unitsOfMeasureOptions = unitsOfMeasure?.reduce(
    (acc, unitOfMeasure) => {
      acc[unitOfMeasure.id] = unitOfMeasure.name;
      return acc;
    },
    {} as Record<string, string>
  );

  const onSubmit = (data: CreateProductInput | UpdateProductInput) => {
    if (selectedProduct) {
      const { id } = selectedProduct || null;
      updateMutate(
        { id, input: data as CreateProductInput },
        {
          onSuccess: () => {
            resetForm();
            setProductFormMode('hidden');
          },
        }
      );
    } else {
      createMutate(data as CreateProductInput, {
        onSuccess: () => {
          resetForm();
          setProductFormMode('hidden');
        },
      });
    }
  };

  if (productFormMode === 'hidden') return null;

  return (
    <FormModal
      formMode={productFormMode}
      onFormButtonActions={onFormButtonActions}
      onSubmit={handleSubmit(onSubmit)}
      isPending={isCreating || isUpdating}
    >
      <Input
        type="text"
        placeholder="Nombre Completo"
        {...register('name')}
        errorMessage={errors.name?.message}
        readOnly={productFormMode === 'show' || isCreating || isUpdating}
      />

      <Input
        type="text"
        placeholder="SKU Code"
        {...register('skuCode')}
        errorMessage={errors.skuCode?.message}
        readOnly={productFormMode === 'show' || isCreating || isUpdating}
      />

      <Select
        placeholder="Categoría"
        options={categoriesOptions ?? {}}
        {...register('categoryId')}
        errorMessage={errors.categoryId?.message}
        isLoadingOptions={isLoadingCategories}
        isErrorOptions={!!categoriesError}
      />

      <Input
        type="number"
        placeholder="Stock Minimum"
        {...register('stockMinimum', { valueAsNumber: true })}
        errorMessage={errors.stockMinimum?.message}
        readOnly={productFormMode === 'show' || isCreating || isUpdating}
      />

      <Select
        placeholder="Unidad de Medida"
        options={unitsOfMeasureOptions ?? {}}
        {...register('unitOfMeasureId')}
        errorMessage={errors.unitOfMeasureId?.message}
        isLoadingOptions={isLoadingUnitsOfMeasure}
        isErrorOptions={!!unitsOfMeasureError}
      />

      <TextArea
        placeholder="Descripción"
        {...register('description')}
        readOnly={productFormMode === 'show' || isCreating || isUpdating}
      />
    </FormModal>
  );
}
