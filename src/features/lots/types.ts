import type { Product } from '../products/types';

/** Lot model used in the UI. */
export interface Lot {
  id: string;
  expirationDate: string;
  initialQuantity: number;
  currentQuantity: number;
  createdAt: string;
  isActive: boolean;
  productId: string;
  /** Resolved product relation (loaded via Supabase join) */
  product: Product;
}
