import ProductForm from '@/features/products/components/ProductForm';
import ProductList from '@/features/products/components/ProductList';
import { usePageTitle } from '@/shared/hooks/usePageTitle';

/** Page component for managing products — list view and create/edit form. */
export default function ProductsPage() {
  usePageTitle('Productos');
  return (
    <div>
      <ProductList />
      <ProductForm />
    </div>
  );
}
