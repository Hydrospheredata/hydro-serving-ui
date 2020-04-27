import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

type ExplanationStatuses =
  | 'NOT_CALLED'
  | 'SUCCESS'
  | 'FAILED'
  | 'STARTED'
  | 'NOT_SUPPORTED'
  | 'PENDING';
export interface Explanation {
  description: string;
  result?: {
    coverage: number;
    explanation: string[];
    precision: number;
  };
  state: ExplanationStatuses;
}

export interface ExplanationRequestParams {
  model_version_id: string;
  explained_request_id: string;
  method: string;
}

@Injectable({
  providedIn: 'root',
})
export class RootCauseService {
  private readonly url: string;

  constructor(private readonly http: HttpClient) {
    this.url = environment.rootCauseUrl;
  }

  createExplanation(params: ExplanationRequestParams): Observable<any> {
    return this.http.post<any>(`${this.url}/explanation`, params);
  }

  getExplanation({
    model_version_id,
    explained_request_id,
    method = 'anchor',
  }: ExplanationRequestParams): Observable<Explanation> {
    return this.http.get<Explanation>(
      `${this.url}/explanation?model_version_id=${model_version_id}&explained_request_id=${explained_request_id}&method=${method}`
    );
  }
}
