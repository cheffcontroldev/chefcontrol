import type { Category } from '@/features/categories/types';
import type { UnitOfMeasure } from '@/features/unitsOfMeasure/types';
import type { Product } from '../types';

interface responseProduct {
  id: string;
  name: string;
  description: string;
  sku_code: string;
  unit_of_measure_id: string;
  stock_minimum: number;
  category_id: string;
  is_active: boolean;
  categories: Category;
  units_of_measure: UnitOfMeasure;
  created_at: string;
  updated_at: string;
}

export const responseToProduct = (response: responseProduct): Product => {
  return {
    id: response.id,
    name: response.name,
    description: response.description,
    skuCode: response.sku_code,
    unitOfMeasureId: response.unit_of_measure_id,
    stockMinimum: response.stock_minimum,
    categoryId: response.category_id,
    isActive: response.is_active,
    category: response.categories,
    unitsOfMeasure: response.units_of_measure,
    createdAt: response.created_at,
    updatedAt: response.updated_at,
  };
};
