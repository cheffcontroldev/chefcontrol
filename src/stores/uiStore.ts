import { create } from 'zustand';
import type { AlertType, FormMode } from '@/shared/types';

/**
 * Global UI state slice covering the page title, alert banners, and per-entity form
 * mode toggles.
 *
 * Each entity (user, restaurant, category, etc.) has a dedicated form mode field so
 * that multiple forms can coexist without collisions.
 * @hidden - Used internally by the store, not meant for direct consumption.
 */
interface UiState {
  /** Current page title displayed in the navbar */
  titlePage: string;
  /** Severity level of the current alert */
  alertType: AlertType;
  /** Message body of the current alert */
  alertMessage: string;
  /** Whether the alert banner is currently visible */
  showAlert: boolean;
  /** Show/hide the user form modal */
  userFormMode: boolean;
  /** Show/hide the password update form */
  userPasswordUpdateFormMode: boolean;
  /** Show/hide the restaurant form modal */
  restaurantFormMode: boolean;
  /** Form mode for the category CRUD modal (`hidden` | `add` | `edit`) */
  categoryFormMode: FormMode;
  /** Form mode for the unit-of-measure CRUD modal */
  unitOfMeasureFormMode: FormMode;
  /** Form mode for the product CRUD modal */
  productFormMode: FormMode;
  /** Form mode for the lot CRUD modal */
  lotFormMode: FormMode;
}

/**
 * Actions available to update the UI state.
 * @hidden
 */
interface UiActions {
  /** Set the page title shown in the top navbar */
  setTitlePage: (titlePage: string) => void;
  /**
   * Display an alert banner. The alert auto-dismisses after 5 seconds,
   * resetting `alertType` to `'info'` and `alertMessage` to empty.
   */
  setShowAlertMessage: (alertType: AlertType, alertMessage: string) => void;
  /** Open or close the user form modal */
  setUserFormMode: (showForm: boolean) => void;
  /** Open or close the password update form */
  setUserPasswordUpdateFormMode: (showForm: boolean) => void;
  /** Open or close the restaurant form modal */
  setRestaurantFormMode: (showForm: boolean) => void;
  /** Set the category form mode */
  setCategoryFormMode: (formMode: FormMode) => void;
  /** Set the unit-of-measure form mode */
  setUnitOfMeasureFormMode: (formMode: FormMode) => void;
  /** Set the product form mode */
  setProductFormMode: (formMode: FormMode) => void;
  /** Set the lot form mode */
  setLotFormMode: (formMode: FormMode) => void;
}

/**
 * Zustand store for global UI state: page titles, alert banners, and per-entity
 * form-mode toggles.
 *
 * Alerts auto-dismiss after **5 seconds** via a `setTimeout` inside
 * `setShowAlertMessage`. Each CRUD entity gets its own `FormMode` field to avoid
 * modal collisions when multiple forms are open simultaneously.
 *
 * @example
 * ```ts
 * const { titlePage, setTitlePage } = useUiStore();
 *
 * // Set the navbar title
 * setTitlePage('Dashboard');
 *
 * // Show a success alert (auto-dismisses in 5 s)
 * setShowAlertMessage('success', 'Changes saved');
 *
 * // Open the category form in add mode
 * setCategoryFormMode('add');
 * ```
 */
export const useUiStore = create<UiState & UiActions>((set) => ({
  titlePage: '',
  alertMessage: '',
  showAlert: false,
  alertType: 'warning' as AlertType,
  userFormMode: false,
  userPasswordUpdateFormMode: false,
  restaurantFormMode: false,
  categoryFormMode: 'hidden',
  unitOfMeasureFormMode: 'hidden',
  productFormMode: 'hidden',
  lotFormMode: 'hidden',
  setTitlePage: (titlePage: string) => set({ titlePage }),
  setShowAlertMessage: (alertType: AlertType, alertMessage: string) => {
    set({ alertType, alertMessage, showAlert: true });
    setTimeout(() => {
      set({ showAlert: false, alertType: 'info' as AlertType, alertMessage: '' });
    }, 5000);
  },
  setUserFormMode: (showForm: boolean) => set({ userFormMode: showForm }),
  setUserPasswordUpdateFormMode: (showForm: boolean) =>
    set({ userPasswordUpdateFormMode: showForm }),
  setRestaurantFormMode: (showForm: boolean) => set({ restaurantFormMode: showForm }),
  setCategoryFormMode: (formMode: FormMode) => set({ categoryFormMode: formMode }),
  setUnitOfMeasureFormMode: (formMode: FormMode) => set({ unitOfMeasureFormMode: formMode }),
  setProductFormMode: (formMode: FormMode) => set({ productFormMode: formMode }),
  setLotFormMode: (formMode: FormMode) => set({ lotFormMode: formMode }),
}));
