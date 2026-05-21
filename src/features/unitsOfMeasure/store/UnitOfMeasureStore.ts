import { create } from 'zustand';
import type { UnitOfMeasure } from '../types';

/**
 * Internal state for the selected unit of measure (used in detail / edit
 * flow).
 * @hidden
 */
interface UnitOfMeasureStateState {
  selectedUnitOfMeasure: UnitOfMeasure | null;
}

/**
 * Actions for the unit-of-measure store.
 * @hidden
 */
interface UnitOfMeasureActions {
  setSelectedUnitOfMeasure: (unitOfMeasure: UnitOfMeasure | null) => void;
}

type UnitOfMeasureState = UnitOfMeasureStateState & UnitOfMeasureActions;

/**
 * Zustand store that holds the currently selected unit of measure for the
 * detail / edit modal flow.
 */
export const useUnitOfMeasureStore = create<UnitOfMeasureState>()((set) => ({
  selectedUnitOfMeasure: null,
  setSelectedUnitOfMeasure: (unitOfMeasure) => set({ selectedUnitOfMeasure: unitOfMeasure }),
}));
