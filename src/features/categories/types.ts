/** Category model used in the UI. */
export interface Category {
  id: string;
  name: string;
  description?: string;
  /** Soft-delete flag — categories are never hard-deleted */
  isDeleted: boolean;
}

/** Input for creating a new category. */
export interface CreateCategoryInput {
  name: string;
  description?: string;
}

/** Input for updating an existing category. */
export interface UpdateCategoryInput {
  name?: string;
  description?: string;
}
