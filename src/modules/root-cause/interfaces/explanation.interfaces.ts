export interface ExplanationRequestBody {
  model: {
    name: string;
    version: number;
  };
  explained_instance: {
    uid: number;
    timestamp: number;
  };
}

export interface GetAllStatusesParams {
  model_name: string;
  model_version: string;
  ts: string;
  uid: string;
}

export const enum ExplanationJobStatus {
  notQueued = 'NOT_QUEUED',
  queued = 'QUEUED',
  pending = 'PENDING',
  started = 'STARTED',
  success = 'SUCCESS',
  failure = 'FAILURE',
}

export interface ExplanationTaskStatus {
  state: ExplanationJobStatus;
  progress?: number;
  task_id?: string;
  result?: string;
}
