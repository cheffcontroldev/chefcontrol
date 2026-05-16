import type { Product } from '@/features/products/types';
import type { Lot } from '../types';

export interface responseLot {
  id: string;
  expiration_date: string;
  initial_quantity: number;
  current_quantity: number;
  created_at: string;
  is_active: boolean;
  product_id: string;
  product: Product;
}

export const responseToLot = (response: responseLot): Lot => {
  return {
    id: response.id,
    expirationDate: response.expiration_date,
    initialQuantity: response.initial_quantity,
    currentQuantity: response.current_quantity,
    createdAt: response.created_at,
    isActive: response.is_active,
    productId: response.product_id,
    product: response.product,
  };
};

export const responseToLots = (responses: responseLot[]): Lot[] => {
  return responses.map(responseToLot);
};
