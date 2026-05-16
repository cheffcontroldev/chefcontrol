import type { Product } from '../products/types';

export interface Lot {
  id: string;
  expirationDate: string;
  initialQuantity: number;
  currentQuantity: number;
  createdAt: string;
  isActive: boolean;
  productId: string;
  product: Product;
}
