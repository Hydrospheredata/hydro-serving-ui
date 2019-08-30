import { ExplanationTaskStatus } from '@rootcause/interfaces';

interface Explanation {
  celery_task_id: string;
  completed_at: string;
  created_at: string;
  explained_instance: {
    timestamp: number;
    uid: number;
  };
  model: {
    name: string;
    version: number;
  };
  started_at: string;
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
  status: ExplanationTaskStatus;
  explanation: any;
  error: string;
}
