import {Injectable} from '@angular/core';
import {Explanation, RootCauseService} from "@rootcause/services";
import {Observable} from "@node_modules/rxjs";

@Injectable()
export class ExplanationService {
  constructor(private readonly rootCauseService: RootCauseService) {
  }

  createExplanation(modelVersionId, requestId) {
    return this.rootCauseService.createExplanation({
      explained_request_id: requestId,
      method: 'anchor',
      model_version_id: modelVersionId
    })
  }

  getExplanation(requestId, modelVersionId): Observable<Explanation> {
    return this.rootCauseService.getExplanation({
      explained_request_id: requestId,
      method: 'anchor',
      model_version_id: modelVersionId
    })
  }
}
