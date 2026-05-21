import { create } from 'zustand';

/**
 * State for the delete-confirmation flow.
 *
 * Instead of passing callbacks through props, the component that triggers the
 * delete stores its action here, and `ModalConfirmDelete` reads and executes it.
 * @hidden
 */
interface DeleteState {
  /**
   * Title/message shown in the confirmation modal, or `null` when the modal is
   * hidden.
   */
  showConfirmDelete: string | null;
  /** The callback to execute when the user confirms the delete */
  confirmDeleteAction: (() => void) | null;
  /**
   * Always `false` — kept for backward compatibility. The actual confirmation
   * flow uses `showConfirmDelete` and `executeConfirmDelete` instead.
   * @deprecated Use {@link executeConfirmDelete} instead.
   */
  confirmDelete: boolean;
}

/**
 * Actions for the delete-confirmation flow.
 * @hidden
 */
interface DeleteActions {
  /** Show or hide the confirmation modal by setting the message text */
  setShowConfirmDelete: (showConfirmDelete: string | null) => void;
  /** Register the callback to run when the user confirms */
  setConfirmDeleteAction: (action: (() => void) | null) => void;
  /**
   * Execute the registered delete action (if any) and reset the confirmation
   * state, effectively closing the modal.
   */
  executeConfirmDelete: () => void;
}

/**
 * Zustand store that decouples the delete-confirmation modal from its trigger.
 *
 * When a component needs to delete something, it:
 * 1. Sets the confirmation message via `setShowConfirmDelete`
 * 2. Registers the actual delete callback via `setConfirmDeleteAction`
 * 3. The modal calls `executeConfirmDelete` when the user clicks "Confirm"
 *
 * @example
 * ```ts
 * const { setShowConfirmDelete, setConfirmDeleteAction } = useDeleteStore();
 *
 * const handleDelete = () => {
 *   setShowConfirmDelete('Delete product "Coffee"?');
 *   setConfirmDeleteAction(async () => {
 *     await deleteProduct(id);
 *     // refresh list ...
 *   });
 * };
 * ```
 */
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
