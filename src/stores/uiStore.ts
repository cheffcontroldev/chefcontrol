import { create } from 'zustand';
import type { AlertType, FormMode } from '@/shared/types';

interface UiState {
  titlePage: string;
  alertType: AlertType;
  alertMessage: string;
  showAlert: boolean;
  userFormMode: boolean;
  userPasswordUpdateFormMode: boolean;
  restaurantFormMode: boolean;
  categoryFormMode: FormMode;
  unitOfMeasureFormMode: FormMode;
  productFormMode: FormMode;
  lotFormMode: FormMode;
}

interface UiActions {
  setTitlePage: (titlePage: string) => void;
  setShowAlertMessage: (alertType: AlertType, alertMessage: string) => void;
  setUserFormMode: (showForm: boolean) => void;
  setUserPasswordUpdateFormMode: (showForm: boolean) => void;
  setRestaurantFormMode: (showForm: boolean) => void;
  setCategoryFormMode: (formMode: FormMode) => void;
  setUnitOfMeasureFormMode: (formMode: FormMode) => void;
  setProductFormMode: (formMode: FormMode) => void;
  setLotFormMode: (formMode: FormMode) => void;
}

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
