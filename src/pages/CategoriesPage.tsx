import CategoryList from '@/features/categories/components/CategoryList';
import CategoryForm from '@/features/categories/components/CategoryForm';
import { usePageTitle } from '@/shared/hooks/usePageTitle';

/** Page component for managing product categories. */
export default function CategoriesPage() {
  usePageTitle('Categorías');
  return (
    <>
      <CategoryList />
      <CategoryForm />
    </>
  );
}
