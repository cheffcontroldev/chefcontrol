import { create } from 'zustand';
import type { AlertType, FormMode } from '@/shared/types';

interface UiState {
  titlePage: string;
  alertType: AlertType;
  alertMessage: string;
  showAlert: boolean;
  userFormMode: FormMode;
}

interface UiActions {
  setTitlePage: (titlePage: string) => void;
  setShowAlertMessage: (alertType: AlertType, alertMessage: string) => void;
  setUserFormMode: (formMode: FormMode) => void;
  hideUserForm: () => void;
}

export const useUiStore = create<UiState & UiActions>((set) => ({
  titlePage: '',
  alertMessage: '',
  showAlert: false,
  alertType: 'warning' as AlertType,
  userFormMode: 'show',
  setTitlePage: (titlePage: string) => set({ titlePage }),
  setShowAlertMessage: (alertType: AlertType, alertMessage: string) => {
    set({ alertType, alertMessage, showAlert: true });
    setTimeout(() => {
      set({ showAlert: false, alertType: 'info' as AlertType, alertMessage: '' });
    }, 5000);
  },
  setUserFormMode: (formMode: FormMode) => set({ userFormMode: formMode }),
  hideUserForm: () => set({ userFormMode: 'hidden' }),
}));
