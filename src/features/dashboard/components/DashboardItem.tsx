import { Link } from 'wouter';
import { RefreshCcw, ArrowUpRight, Loader2 } from 'lucide-react';
import type { ReactNode } from 'react';

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
  /** Whether the count is being fetched */
  isLoading: boolean;
  /** Icon to display in the card header */
  icon?: ReactNode;
  /** Color theme for the card */
  color?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
}

const colorMap = {
  primary: 'bg-primary/10 text-primary ring-primary/20',
  secondary: 'bg-secondary/10 text-secondary ring-secondary/20',
  accent: 'bg-accent/10 text-accent ring-accent/20',
  info: 'bg-info/10 text-info ring-info/20',
  success: 'bg-success/10 text-success ring-success/20',
  warning: 'bg-warning/10 text-warning ring-warning/20',
  error: 'bg-error/10 text-error ring-error/20',
};

const badgeColorMap = {
  primary: 'badge-primary',
  secondary: 'badge-secondary',
  accent: 'badge-accent',
  info: 'badge-info',
  success: 'badge-success',
  warning: 'badge-warning',
  error: 'badge-error',
};

/**
 * Generic dashboard card that displays a large numeric count with action
 * buttons.
 *
 * Includes a "Refrescar" button and a "Ver..." link.
 */
export default function DashboardItem({
  title,
  count,
  href,
  refresh,
  isLoading,
  icon,
  color = 'primary',
}: DashboardItemProps) {
  return (
    <div className="card bg-base-100 w-full shadow-xl border border-base-200 hover:shadow-2xl transition-all duration-300 xl:h-[340px]">
      <div className="card-body flex flex-col justify-between">
        {/* Header con icono y refresh */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {icon && <div className={`p-3 rounded-xl ring-2 ${colorMap[color]}`}>{icon}</div>}
            <div>
              <h2 className="card-title text-lg">{title}</h2>
              <span className={`badge badge-sm ${badgeColorMap[color]} mt-1`}>Dashboard</span>
            </div>
          </div>
          {refresh && (
            <button
              type="button"
              className="btn btn-ghost btn-sm btn-circle hover:bg-base-200"
              onClick={refresh}
              title="Refrescar datos"
            >
              <RefreshCcw className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Contador grande */}
        <div className="flex-1 flex items-center justify-center py-4">
          {isLoading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-12 h-12 animate-spin text-base-content/30" />
              <span className="text-sm text-base-content/50">Cargando...</span>
            </div>
          ) : (
            <div className="text-center">
              <span className={`text-7xl xl:text-8xl font-bold ${colorMap[color].split(' ')[1]}`}>
                {count}
              </span>
              <p className="text-sm text-base-content/60 mt-2">
                {count === 1
                  ? `${title.slice(0, -1)} registrado`
                  : `${title.toLowerCase()} registrados`}
              </p>
            </div>
          )}
        </div>

        {/* Acciones */}
        <div className="card-actions justify-center gap-2 pt-2">
          <Link
            href={href}
            className={`btn gap-2 ${colorMap[color].split(' ')[1].replace('text-', 'btn-')}`}
          >
            Ver {title.toLowerCase()}
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
