import { Link } from 'wouter';
import type { LucideIcon } from 'lucide-react';

/**
 * Props for the SidebarMenuItem component.
 */
interface SidebarMenuItemProps {
  /** Lucide icon displayed next to the label */
  icon: LucideIcon;
  /** Display text for the menu item */
  title: string;
  /** Route path the item links to */
  href: string;
}

/**
 * Single navigation item for the sidebar.
 * @description A clickable sidebar entry with icon and label.
 * When the sidebar is collapsed, shows as a tooltip-only icon.
 *
 * @example
 * ```tsx
 * <SidebarMenuItem icon={Home} title="Dashboard" href="/" />
 * ```
 *
 * @param icon - Lucide icon component
 * @param title - Visible label text
 * @param href - Navigation route
 */
export default function SidebarMenuItem({ icon: Icon, title, href }: SidebarMenuItemProps) {
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
    </li>
  );
}
