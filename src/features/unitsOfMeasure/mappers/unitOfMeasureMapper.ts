import type { UnitOfMeasure } from '../types';

/** Raw shape of a UoM row returned by Supabase (snake_case). */
export interface responseUnitOfMeasure {
  id: string;
  name: string;
  abbreviation: string;
  is_deleted: boolean;
}

/** Convert a single Supabase UoM row to the camelCase UI model. */
export const responseToUnitOfMeasure = (response: responseUnitOfMeasure): UnitOfMeasure => {
  return {
    id: response.id,
    name: response.name,
    abbreviation: response.abbreviation,
    isDeleted: response.is_deleted,
  };
};

/** Convert an array of Supabase UoM rows to the UI model. */
export const responseToUnitOfMeasures = (responses: responseUnitOfMeasure[]): UnitOfMeasure[] => {
  return responses.map(responseToUnitOfMeasure);
};
