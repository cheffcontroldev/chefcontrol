import { create } from 'zustand';
import type { UnitOfMeasure } from '../types';

interface UnitOfMeasureStateState {
  selectedUnitOfMeasure: UnitOfMeasure | null;
}

interface UnitOfMeasureActions {
  setSelectedUnitOfMeasure: (unitOfMeasure: UnitOfMeasure | null) => void;
}

type UnitOfMeasureState = UnitOfMeasureStateState & UnitOfMeasureActions;

export const useUnitOfMeasureStore = create<UnitOfMeasureState>()((set) => ({
  selectedUnitOfMeasure: null,
  setSelectedUnitOfMeasure: (unitOfMeasure) => set({ selectedUnitOfMeasure: unitOfMeasure }),
}));
