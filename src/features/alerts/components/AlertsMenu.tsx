import BigMenuItem from '@/shared/components/BigMenuItem';
import { TriangleAlert, ArrowBigDownDash } from 'lucide-react';

export default function AlertsMenu() {
  return (
    <div className="px-3 w-full justify-center flex gap-4 flex-wrap lg:min-w-6xl">
      <BigMenuItem icon={TriangleAlert} title="Lotes por vencer" href="/alertas/por-vencer" />
      <BigMenuItem
        icon={ArrowBigDownDash}
        title="Lotes con bajo stock"
        href="/alertas/bajo-stock"
      />
    </div>
  );
}
