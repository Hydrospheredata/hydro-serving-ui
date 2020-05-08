import { Injectable } from '@angular/core';
import { Observable } from '@node_modules/rxjs';
import { Explanation } from '@rootcause/models';
import { RootCauseApiService } from '@rootcause/services';

@Injectable()
export class ExplanationFacade {
  constructor(private readonly rootCauseService: RootCauseApiService) {}

  createExplanation(modelVersionId, requestId) {
    return this.rootCauseService.createExplanation({
      explained_request_id: requestId,
      method: 'anchor',
      model_version_id: modelVersionId,
    });
  }

  getExplanation(requestId, modelVersionId): Observable<Explanation> {
    return this.rootCauseService.getExplanation({
      explained_request_id: requestId,
      method: 'anchor',
      model_version_id: modelVersionId,
    });
  }
}
