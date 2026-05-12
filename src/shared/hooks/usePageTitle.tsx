// shared/hooks/usePageTitle.ts
import { useEffect } from 'react';
import { useUiStore } from '@/stores/uiStore';

export function usePageTitle(title: string) {
  const { setTitlePage } = useUiStore();

  useEffect(() => {
    setTitlePage(title);
  }, [title, setTitlePage]);
}
