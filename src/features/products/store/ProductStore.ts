import { create } from 'zustand';
import type { Product } from '../types';

interface ProductStateState {
  selectedProduct: Product | null;
}

interface ProductActions {
  setSelectedProduct: (product: Product | null) => void;
}

type ProductState = ProductStateState & ProductActions;

export const useProductStore = create<ProductState>()((set) => ({
  selectedProduct: null,
  setSelectedProduct: (product) => set({ selectedProduct: product }),
}));
