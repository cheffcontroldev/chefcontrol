import { create } from 'zustand';
import type { Category } from '../types';

interface CategoryStateState {
  selectedCategory: Category | null;
}

interface CategoryActions {
  setSelectedCategory: (category: Category | null) => void;
}

type CategoryState = CategoryStateState & CategoryActions;

export const useCategoryStore = create<CategoryState>()((set) => ({
  selectedCategory: null,
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));
