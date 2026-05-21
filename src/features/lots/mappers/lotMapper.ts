import type { Lot } from '../types';
import { type ResponseProduct, responseToProduct } from '@/features/products/mappers/productMapper';

/** Raw shape of a lot row returned by Supabase (snake_case, with joined product). */
export interface ResponseLot {
  id: string;
  expiration_date: string;
  initial_quantity: number;
  current_quantity: number;
  created_at: string;
  is_active: boolean;
  product_id: string;
  products: ResponseProduct;
}

/** Convert a single Supabase lot row to the camelCase UI model. */
export const responseToLot = (response: ResponseLot): Lot => {
  return {
    id: response.id,
    expirationDate: response.expiration_date,
    initialQuantity: response.initial_quantity,
    currentQuantity: response.current_quantity,
    createdAt: response.created_at,
    isActive: response.is_active,
    productId: response.product_id,
    product: responseToProduct(response.products),
  };
};

/** Convert an array of Supabase lot rows to the UI model. */
export const responseToLots = (responses: ResponseLot[]): Lot[] => {
  return responses.map(responseToLot);
};
