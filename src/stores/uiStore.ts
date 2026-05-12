import { create } from 'zustand';
import type { AlertType } from '@/shared/types';

interface UiState {
  titlePage: string;
  alertType: AlertType;
  alertMessage: string;
  showAlert: boolean;
}

interface UiActions {
  setTitlePage: (titlePage: string) => void;
  setShowAlertMessage: (alertType: AlertType, alertMessage: string) => void;
}

export const useUiStore = create<UiState & UiActions>((set) => ({
  titlePage: '',
  alertMessage: '',
  showAlert: false,
  alertType: 'warning' as AlertType,
  setTitlePage: (titlePage: string) => set({ titlePage }),
  setShowAlertMessage: (alertType: AlertType, alertMessage: string) => {
    set({ alertType, alertMessage, showAlert: true });
    setTimeout(() => {
      set({ showAlert: false, alertType: 'info' as AlertType, alertMessage: '' });
    }, 5000);
  },
}));
