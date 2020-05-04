import { mockCheck } from '@monitoring/mocks/check.mock';
import { CheckCollection } from '@monitoring/models/CheckCollection';

export const mockEmptyCheckCollection: CheckCollection = new CheckCollection(
  []
);
export const mockCheckCollection: CheckCollection = new CheckCollection([
  mockCheck,
]);
