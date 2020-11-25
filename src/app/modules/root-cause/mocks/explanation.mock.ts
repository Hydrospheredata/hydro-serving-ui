import { anchorResultMock } from '../mocks/anchor-result.mock';
import { Explanation, ExplanationStatus } from '../models';

export const explanationMock: Explanation = {
  description: 'Ok',
  state: ExplanationStatus.success,
  result: anchorResultMock,
};
