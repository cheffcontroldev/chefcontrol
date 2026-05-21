import Sidebar from './Sidebar';

/**
 * Main application layout with sidebar navigation.
 * @description Wraps page content inside the Sidebar component,
 * providing the authenticated app shell with navigation.
 *
 * @example
 * ```tsx
 * <Layout>
 *   <DashboardPage />
 * </Layout>
 * ```
 *
 * @param children - Page content rendered within the sidebar layout
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar>{children}</Sidebar>
    </>
  );
}
