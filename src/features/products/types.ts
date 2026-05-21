import type { Category } from '../categories/types';
import type { UnitOfMeasure } from '../unitsOfMeasure/types';

/** Product model used in the UI. */
export interface Product {
  id: string;
  name: string;
  description?: string;
  /** Unique SKU code for the product */
  skuCode?: string;
  unitOfMeasureId: string;
  /** Minimum stock threshold before triggering low-stock alerts */
  stockMinimum: number;
  categoryId?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  /** Resolved category relation (loaded via Supabase join) */
  category: Category;
  /** Resolved UoM relation (loaded via Supabase join) */
  unitsOfMeasure: UnitOfMeasure;
}

/** Input for creating a new product. */
export interface CreateProductInput {
  name: string;
  description?: string;
  skuCode?: string;
  stockMinimum: number;
  isActive?: boolean;
  categoryId?: string;
  unitOfMeasureId: string;
}

/** Input for updating an existing product. */
export interface UpdateProductInput {
  name?: string;
  description?: string;
  skuCode?: string;
  unitOfMeasureId?: string;
  stockMinimum?: number;
  isActive?: boolean;
  categoryId?: string;
}
