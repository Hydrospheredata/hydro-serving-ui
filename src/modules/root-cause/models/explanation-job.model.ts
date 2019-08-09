export const enum ExplanationJobStatus {
  queued = 'QUEUED',
  pending = 'PENDING',
  started = 'STARTED',
  success = 'SUCCESS',
  failure = 'FAILURE',
}

export type ExplanationType = 'rise' | 'anchor';

export class ExplanationJob {
  uid: string;
  jobId: string = null;
  jobStatus: ExplanationJobStatus;
  progress: number = 0;
  resultId: string = null;
  explanation: any = null;
  error: string = null;
  explanationType: ExplanationType;
  constructor(props) {
    this.uid = props.uid;
    this.jobId = props.jobId;
    this.jobStatus = ExplanationJobStatus.queued;
    this.explanationType = props.explanationType;
  }
}
