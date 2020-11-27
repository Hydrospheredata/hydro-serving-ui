import { mockCheck } from '../mocks/check.mock';
import { CheckCollection } from '../models/CheckCollection';

export const mockEmptyCheckCollection: CheckCollection = new CheckCollection(
  []
);
export const mockCheckCollection: CheckCollection = new CheckCollection([
  mockCheck,
]);
