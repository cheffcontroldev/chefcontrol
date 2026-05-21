// shared/hooks/usePageTitle.ts
import { useEffect } from 'react';
import { useUiStore } from '@/stores/uiStore';

/**
 * Sets the page title in the global UI store.
 * @description Updates the `titlePage` value in uiStore, which is
 * displayed in the navbar. Call this at the top of each page component.
 *
 * @param title - The title string to display in the navbar
 *
 * @example
 * ```tsx
 * usePageTitle('Dashboard');
 * // Navbar now shows "Dashboard"
 * ```
 */
export function usePageTitle(title: string) {
  const { setTitlePage } = useUiStore();

  useEffect(() => {
    setTitlePage(title);
  }, [title, setTitlePage]);
}
