import { AnchorExplanationResult } from '../models';

export const anchorResultMock: AnchorExplanationResult = {
  coverage: 0,
  explained_field_name: 'classes',
  explained_field_value: 1,
  explanation: ['country != 3.0', 'age > 15.0'],
  precision: 0.99,
};
