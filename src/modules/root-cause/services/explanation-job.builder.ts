import { Injectable } from '@angular/core';
import { ExplanationJob, ExplanationType } from '@rootcause/models';

@Injectable()
export class ExplanationJobBuilder {
  build(props: {
    uid: string;
    jobId: string;
    explanationType: ExplanationType;
  }): ExplanationJob {
    return new ExplanationJob(props);
  }
}
