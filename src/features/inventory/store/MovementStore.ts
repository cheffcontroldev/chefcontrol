import { create } from 'zustand';
import type { Movement } from '../types';

/**
 * Internal state for the selected movement (used in the detail modal).
 * @hidden
 */
interface MovementStateState {
  selectedMovement: Movement | null;
}

/**
 * Actions for the movement store.
 * @hidden
 */
interface MovementActions {
  setSelectedMovement: (movement: Movement | null) => void;
}

type MovementState = MovementStateState & MovementActions;

/**
 * Zustand store that holds the currently selected movement for the detail
 * modal.
 */
export const useMovementStore = create<MovementState>()((set) => ({
  selectedMovement: null,
  setSelectedMovement: (movement) => set({ selectedMovement: movement }),
}));
