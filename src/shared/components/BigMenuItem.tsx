import { Link } from 'wouter';
import type { LucideIcon } from 'lucide-react';

interface BigMenuItemProps {
  icon: LucideIcon;
  title: string;
  href: string;
}

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
