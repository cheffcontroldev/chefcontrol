import { create } from 'zustand';
import type { Lot } from '../types';

interface LotState {
  selectedLot: Lot | null;
}

interface LotActions {
  setSelectedLot: (lot: Lot | null) => void;
}

type LotStore = LotState & LotActions;

export const useLotStore = create<LotStore>()((set) => ({
  selectedLot: null,
  setSelectedLot: (lot) => set({ selectedLot: lot }),
}));
