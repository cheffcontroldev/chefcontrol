import { Link } from 'wouter';
import type { LucideIcon } from 'lucide-react';

interface SidebarMenuGroupProps {
  icon: LucideIcon;
  title: string;
  href: string;
  children: React.ReactNode;
}

export default function SidebarMenuItem({
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
      <ul className="is-drawer-close:hidden is-drawer-open:block">{children}</ul>
    </li>
  );
}
