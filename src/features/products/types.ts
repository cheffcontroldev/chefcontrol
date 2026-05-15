export interface Product {
  id: string;
  name: string;
  description?: string;
  skuCode?: string;
  unitOfMeasureId: string;
  stockMinimum: number;
  categoryId?: string;
  restaurantId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductInput {
  name: string;
  description?: string;
  skuCode?: string;
  unitOfMeasureId: string;
  stockMinimum: number;
  categoryId?: string;
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
