import { useUiStore } from '@/stores/uiStore';

/**
 * Layout for authentication and registration pages.
 * @description A centered layout with app title and page title,
 * used for non-authenticated pages like login and registration.
 * Simpler than the main Layout — no sidebar, just a branded header.
 *
 * @example
 * ```tsx
 * <InitialLayout>
 *   <LoginForm />
 * </InitialLayout>
 * ```
 *
 * @param children - Auth page content rendered in the center
 */
export default function InitialLayout({ children }: { children: React.ReactNode }) {
  const { titlePage } = useUiStore();
  return (
    <div className="min-h-screen flex flex-col mx-3">
      <div className="w-full h-full max-h-1/4 p-12 shrink-0">
        <h1 className="text-center text-3xl font-bold mb-2">Chef Control</h1>
        <h2 className="text-center text-2xl">{titlePage}</h2>
      </div>
      <div className="flex items-center justify-center h-full shrink">{children}</div>
    </div>
  );
}
