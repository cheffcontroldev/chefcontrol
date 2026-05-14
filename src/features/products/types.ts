export interface CreateProductInput {
  name: string;
  description?: string;
  skuCode?: string;
  unitOfMeasureId: string;
  stockMinimum: number;
  categoryId?: string;
  restaurantId: string;
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
