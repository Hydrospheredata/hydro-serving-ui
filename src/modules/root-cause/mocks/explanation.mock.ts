import { anchorResultMock } from '@rootcause/mocks/anchor-result.mock';
import { Explanation, ExplanationStatus } from '@rootcause/models';

export const explanationMock: Explanation = {
  description: 'Ok',
  state: ExplanationStatus.success,
  result: anchorResultMock,
};
