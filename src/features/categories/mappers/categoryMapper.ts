import type { Category } from '@/features/categories/types';

export interface responseCategory {
  id: string;
  name: string;
  description: string;
  is_deleted: boolean;
}

export const responseToCategory = (response: responseCategory): Category => {
  return {
    id: response.id,
    name: response.name,
    description: response.description,
    isDeleted: response.is_deleted,
  };
};

export const responseToCategories = (responses: responseCategory[]): Category[] => {
  return responses.map(responseToCategory);
};
