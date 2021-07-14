export const enum ExplanationStatus {
  success = 'SUCCESS',
  failed = 'FAILED',
  notSupported = 'NOT_SUPPORTED',
  notCalled = 'NOT_CALLED',
  started = 'STARTED',
}

export interface Explanation {
  description: string;
  result?: {
    coverage: number;
    explanation: string[];
    precision: number;
  };
  state: ExplanationStatus;
}

export interface AnchorExplanationResult {
  explained_field_name: string;
  explained_field_value: number | string;
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
