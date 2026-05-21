import { create } from 'zustand';
import type { Product } from '../types';

/**
 * Internal state for the selected product (used in the detail / edit flow).
 * @hidden
 */
interface ProductStateState {
  selectedProduct: Product | null;
}

/**
 * Actions for the product store.
 * @hidden
 */
interface ProductActions {
  setSelectedProduct: (product: Product | null) => void;
}

type ProductState = ProductStateState & ProductActions;

/**
 * Zustand store that holds the currently selected product for the detail /
 * edit modal flow.
 */
export const useProductStore = create<ProductState>()((set) => ({
  selectedProduct: null,
  setSelectedProduct: (product) => set({ selectedProduct: product }),
}));
