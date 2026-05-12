import { Link } from 'wouter';
import type { LucideIcon } from 'lucide-react';

interface SidebarMenuItemProps {
  icon: LucideIcon;
  title: string;
  href: string;
}

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
