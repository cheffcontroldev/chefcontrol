import type { LucideIcon } from 'lucide-react';

interface SidebarMenuGroupProps {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}

export default function SidebarMenuItem({ icon: Icon, title, children }: SidebarMenuGroupProps) {
  return (
    <li>
      <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip={title}>
        <Icon className="my-1.5 inline-block size-4" />
        <span className="text-nowrap is-drawer-close:hidden">{title}</span>
      </button>
      <ul className="is-drawer-close:hidden is-drawer-open:block">{children}</ul>
    </li>
  );
}
