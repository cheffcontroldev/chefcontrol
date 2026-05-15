import type { UnitOfMeasure } from '../types';

export interface responseUnitOfMeasure {
  id: string;
  name: string;
  abbreviation: string;
  is_deleted: boolean;
}

export const responseToUnitOfMeasure = (response: responseUnitOfMeasure): UnitOfMeasure => {
  return {
    id: response.id,
    name: response.name,
    abbreviation: response.abbreviation,
    isDeleted: response.is_deleted,
  };
};

export const responseToUnitOfMeasures = (responses: responseUnitOfMeasure[]): UnitOfMeasure[] => {
  return responses.map(responseToUnitOfMeasure);
};
