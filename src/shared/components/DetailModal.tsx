/**
 * Generic detail modal for read-only information display.
 * @description A full-screen modal overlay for displaying item details.
 * Wraps children in a card with backdrop blur. Use with table rows
 * to show expanded information.
 *
 * @example
 * ```tsx
 * <DetailModal>
 *   <h2>Product Details</h2>
 *   <p>Name: {product.name}</p>
 * </DetailModal>
 * ```
 *
 * @param children - Content rendered inside the modal card
 * @returns The modal overlay with children
 */
export default function DetailModal({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 w-full h-screen flex items-center justify-center bg-base-300 opacity-70 backdrop-blur-xl z-50">
      <div className="card bg-base-100 shadow-xl z-50 p-6">
        <div>{children}</div>
      </div>
    </div>
  );
}
