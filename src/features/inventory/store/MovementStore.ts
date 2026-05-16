import { create } from 'zustand';
import type { Movement } from '../types';

interface MovementStateState {
  selectedMovement: Movement | null;
}

interface MovementActions {
  setSelectedMovement: (movement: Movement | null) => void;
}

type MovementState = MovementStateState & MovementActions;

export const useMovementStore = create<MovementState>()((set) => ({
  selectedMovement: null,
  setSelectedMovement: (movement) => set({ selectedMovement: movement }),
}));
