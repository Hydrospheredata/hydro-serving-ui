import { ExplanationStatuses } from '@rootcause/models/explanation-status.model';

export interface Explanation {
  description: string;
  result?: {
    coverage: number;
    explanation: string[];
    precision: number;
  };
  state: ExplanationStatuses;
}

export interface AnchorExplanationResult {
  coverage: number;
  explanation: string[];
  precision: number;
}
export type RiseExplanationResult = Array<{
  class: string | number;
  mask: any;
  probability: number;
  color?: any;
}>;

export type AnchorExplanation = Explanation & {
  result: AnchorExplanationResult;
};
export type RiseExplanation = Explanation & { result: RiseExplanationResult };

export class ExplanationTask {
  method: string;
  status: any;
  explanation: any;
  error: string;
}
