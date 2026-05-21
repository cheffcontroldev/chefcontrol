import { Link } from 'wouter';
import { RefreshCcw } from 'lucide-react';

/** Props for the {@link DashboardItem} card component. */
interface DashboardItemProps {
  /** Display title (e.g. "Categorías", "Productos") */
  title: string;
  /** Numeric count to display prominently */
  count: number;
  /** Link target for the "Ver..." button */
  href: string;
  /** Optional callback to refresh the count */
  refresh?: () => void;
}

/**
 * Generic dashboard card that displays a large numeric count with action
 * buttons.
 *
 * Includes a "Refrescar" button and a "Ver..." link.
 *
 * NOTE: `DashboardCategories` and `DashboardProducts` pass an `isLoading`
 * prop, but this component does **not** declare or use it. The prop is
 * silently ignored (see the callers for the actual loading behaviour).
 */
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
