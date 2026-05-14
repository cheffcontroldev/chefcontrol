export interface Category {
  id: string;
  name: string;
  description?: string;
  isDeleted: boolean;
}

export interface CreateCategoryInput {
  name: string;
  description?: string;
}

export interface UpdateCategoryInput {
  name?: string;
  description?: string;
}
