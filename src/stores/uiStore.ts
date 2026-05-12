import { create } from 'zustand';

interface UiState {
  titlePage: string;
}

interface UiActions {
  setTitlePage: (titlePage: string) => void;
}

export const useUiStore = create<UiState & UiActions>((set) => ({
  titlePage: '',
  setTitlePage: (titlePage: string) => set({ titlePage }),
}));
