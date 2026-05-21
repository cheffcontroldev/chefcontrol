import { Link } from 'wouter';
import type { LucideIcon } from 'lucide-react';

/**
 * Props for the BigMenuItem component.
 */
interface BigMenuItemProps {
  /** Lucide icon component to display */
  icon: LucideIcon;
  /** Display title for the menu item */
  title: string;
  /** Route path for navigation */
  href: string;
}

/**
 * Large navigation card for feature menus.
 * @description A clickable card with a large icon and title, used
 * in feature landing pages (Settings, Reports, Alerts) to navigate
 * to sub-pages. Renders as a wouter Link.
 *
 * @example
 * ```tsx
 * <BigMenuItem
 *   icon={UsersRound}
 *   title="Usuarios"
 *   href="/configuracion/usuarios"
 * />
 * ```
 *
 * @param icon - Lucide icon displayed in the card
 * @param title - Card title text
 * @param href - Navigation route
 */
export default function BigMenuItem({ icon: Icon, title, href }: BigMenuItemProps) {
  return (
    <Link
      href={href}
      className="card bg-base-100 w-full max-w-[300px] max-h-[300px] border border-base-300 shrink-0 shadow-xl hover:shadow-xs transition-all duration-200"
    >
      <figure className="px-10 pt-16 pb-4">
        <Icon className="w-[100px] h-[100px]" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{title}</h2>
      </div>
    </Link>
  );
}
