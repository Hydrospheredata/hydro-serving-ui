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

export const enum ExplanationJobStatus {
  notQueued = 'NOT_QUEUED',
  queued = 'QUEUED',
  pending = 'PENDING',
  started = 'STARTED',
  success = 'SUCCESS',
  failure = 'FAILURE',
}
