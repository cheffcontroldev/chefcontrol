import type { Category } from '@/features/categories/types';
import type { UnitOfMeasure } from '@/features/unitsOfMeasure/types';
import type { Product, CreateProductInput, UpdateProductInput } from '../types';

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

export const responseToProducts = (responses: responseProduct[]): Product[] => {
  return responses.map(responseToProduct);
};

export const productToRequest = (product: CreateProductInput | UpdateProductInput) => {
  return {
    name: product.name,
    description: product.description,
    sku_code: product.skuCode,
    unit_of_measure_id: product.unitOfMeasureId,
    stock_minimum: product.stockMinimum,
    category_id: product.categoryId,
    is_active: product.isActive,
  };
};
