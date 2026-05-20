import { Link } from 'wouter';
import { RefreshCcw } from 'lucide-react';

interface DashboardItemProps {
  title: string;
  count: number;
  href: string;
  refresh?: () => void;
}

export default function DashboardItem({ title, count, href, refresh }: DashboardItemProps) {
  return (
    <div className="card bg-base-100 w-full shadow-xl border border-base-200 xl:h-[340px]">
      <div className="card-body">
        <h2 className="card-title text-3xl text-center">{title}</h2>
        <div className="text-center mb-0 p-0 text-8xl flex items-center justify-center min-h-[96px] xl:text-9xl xl:py-4">
          {count}
        </div>
        <div className="card-actions justify-center py-6">
          <button className="btn btn-secondary" onClick={() => refresh?.()}>
            <RefreshCcw className="w-4 h-4" />
            Refrescar
          </button>
          <Link href={href} className="btn btn-primary">
            Ver {title.toLowerCase()}
          </Link>
        </div>
      </div>
    </div>
  );
}
