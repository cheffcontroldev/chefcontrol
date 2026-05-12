import type { LucideIcon } from 'lucide-react';

interface SidebarMenuItemProps {
  icon: LucideIcon;
  title: string;
}

export default function SidebarMenuItem({ icon: Icon, title }: SidebarMenuItemProps) {
  return (
    <li>
      <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip={title}>
        <Icon className="my-1.5 inline-block size-4" />
        <span className="text-nowrap is-drawer-close:hidden">{title}</span>
      </button>
    </li>
  );
}
