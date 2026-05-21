import { Link } from 'wouter';
import type { LucideIcon } from 'lucide-react';

/**
 * Props for the SidebarMenuGroup component.
 */
interface SidebarMenuGroupProps {
  /** Lucide icon displayed next to the group label */
  icon: LucideIcon;
  /** Display text for the group header */
  title: string;
  /** Route path for the group header link */
  href: string;
  /** Sub-menu items rendered as a nested list */
  children: React.ReactNode;
}

/**
 * Collapsible group of navigation items for the sidebar.
 * @description Renders a clickable header with children as a nested list.
 * ⚠️ Note: The function is named `SidebarMenuItem` instead of
 * `SidebarMenuGroup` — this may cause confusion.
 *
 * @example
 * ```tsx
 * <SidebarMenuGroup icon={Settings} title="Configuración" href="/config">
 *   <SidebarMenuItem icon={Users} title="Usuarios" href="/config/usuarios" />
 * </SidebarMenuGroup>
 * ```
 *
 * @param icon - Lucide icon for the group header
 * @param title - Group label text
 * @param href - Route for the group header
 * @param children - Sub-menu items
 */
export default function SidebarMenuGroup({
  icon: Icon,
  title,
  href,
  children,
}: SidebarMenuGroupProps) {
  return (
    <li>
      <Link
        href={href}
        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
        data-tip={title}
      >
        <Icon className="my-1.5 inline-block size-4" />
        <span className="text-nowrap is-drawer-close:hidden">{title}</span>
      </Link>
      <ul className="is-drawer-close:-translate-x-6">{children}</ul>
    </li>
  );
}
