/** Unit of measure model used in the UI. */
export interface UnitOfMeasure {
  id: string;
  name: string;
  abbreviation?: string;
  /** Soft-delete flag */
  isDeleted: boolean;
}

/** Input for creating a new unit of measure. */
export interface CreateUnitOfMeasureInput {
  name: string;
  abbreviation: string;
}

/** Input for updating an existing unit of measure. */
export interface UpdateUnitOfMeasureInput {
  name?: string;
  abbreviation: string;
}
