import type { Category } from '@/features/categories/types';

/** Raw shape of a category row returned by Supabase (snake_case). */
export interface responseCategory {
  id: string;
  name: string;
  description: string;
  is_deleted: boolean;
}

/** Convert a single Supabase category row to the camelCase UI model. */
export const responseToCategory = (response: responseCategory): Category => {
  return {
    id: response.id,
    name: response.name,
    description: response.description,
    isDeleted: response.is_deleted,
  };
};

/** Convert an array of Supabase category rows to the UI model. */
export const responseToCategories = (responses: responseCategory[]): Category[] => {
  return responses.map(responseToCategory);
};
