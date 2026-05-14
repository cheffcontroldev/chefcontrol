export interface UnitOfMeasure {
  id: string;
  name: string;
  abbreviation?: string;
  isDeleted: boolean;
}

export interface CreateUnitOfMeasureInput {
  name: string;
  abbreviation: string;
}

export interface UpdateUnitOfMeasureInput {
  name?: string;
  abbreviation: string;
}
