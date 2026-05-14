import { create } from 'zustand';

interface DeleteState {
  showConfirmDelete: string | null;
  confirmDeleteAction: (() => void) | null;
  confirmDelete: boolean;
}

interface DeleteActions {
  setShowConfirmDelete: (showConfirmDelete: string | null) => void;
  setConfirmDeleteAction: (action: (() => void) | null) => void;
  executeConfirmDelete: () => void;
}

export const useDeleteStore = create<DeleteState & DeleteActions>((set, get) => ({
  showConfirmDelete: null,
  confirmDeleteAction: null,
  confirmDelete: false,

  setShowConfirmDelete: (showConfirmDelete) => set({ showConfirmDelete }),
  setConfirmDeleteAction: (action) => set({ confirmDeleteAction: action }),
  executeConfirmDelete: () => {
    const { confirmDeleteAction } = get();
    confirmDeleteAction?.();
    set({ showConfirmDelete: null, confirmDeleteAction: null });
  },
}));
