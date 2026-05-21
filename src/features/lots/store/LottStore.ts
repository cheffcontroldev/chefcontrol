import { create } from 'zustand';
import type { Lot } from '../types';

/**
 * Internal state for the selected lot (used in the detail modal).
 * @hidden
 */
interface LotState {
  selectedLot: Lot | null;
}

/**
 * Actions for the lot store.
 * @hidden
 */
interface LotActions {
  setSelectedLot: (lot: Lot | null) => void;
}

type LotStore = LotState & LotActions;

/**
 * Zustand store that holds the currently selected lot for the detail modal.
 */
export const useLotStore = create<LotStore>()((set) => ({
  selectedLot: null,
  setSelectedLot: (lot) => set({ selectedLot: lot }),
}));
