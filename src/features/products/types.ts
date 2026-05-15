import type { Category } from '../categories/types';
import type { UnitOfMeasure } from '../unitsOfMeasure/types';

export interface Product {
  id: string;
  name: string;
  description?: string;
  skuCode?: string;
  unitOfMeasureId: string;
  stockMinimum: number;
  categoryId?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  category: Category;
  unitsOfMeasure: UnitOfMeasure;
}

export interface CreateProductInput {
  name: string;
  description?: string;
  skuCode?: string;
  stockMinimum: number;
  isActive?: boolean;
  categoryId?: string;
  unitOfMeasureId: string;
}

export interface UpdateProductInput {
  name?: string;
  description?: string;
  skuCode?: string;
  unitOfMeasureId?: string;
  stockMinimum?: number;
  isActive?: boolean;
  categoryId?: string;
}
