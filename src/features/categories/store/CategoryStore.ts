import { create } from 'zustand';
import type { Category } from '../types';

/**
 * Internal state for the selected category (used in the detail / edit flow).
 * @hidden
 */
interface CategoryStateState {
  selectedCategory: Category | null;
}

/**
 * Actions for the category store.
 * @hidden
 */
interface CategoryActions {
  setSelectedCategory: (category: Category | null) => void;
}

type CategoryState = CategoryStateState & CategoryActions;

/**
 * Zustand store that holds the currently selected category for the detail /
 * edit modal flow.
 */
export const useCategoryStore = create<CategoryState>()((set) => ({
  selectedCategory: null,
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));
