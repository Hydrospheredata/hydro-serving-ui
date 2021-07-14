import { Injectable } from '@angular/core';
import { HttpService } from '@app/core/data/services/http.service';
import { Explanation } from '../models';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

export interface ExplanationRequestParams {
  model_version_id: number;
  explained_request_id: string;
  method: string;
  output_field: string;
}

export interface ExplanationRequestPostParams {
  model_version_id: string;
  explained_request_id: string;
  method: string;
  output_field: string;
}

@Injectable({
  providedIn: 'root',
})
export class RootCauseApiService {
  private readonly url: string;

  constructor(private readonly http: HttpService) {
    this.url = environment.rootCauseUrl;
  }

  createExplanation(params: ExplanationRequestPostParams): Observable<any> {
    return this.http.post<any>(`${this.url}/explanation`, {
      ...params,
    });
  }

  getExplanation({
    model_version_id,
    explained_request_id,
    method = 'anchor',
    output_field,
  }: ExplanationRequestParams): Observable<Explanation> {
    return this.http.get<Explanation>(`${this.url}/explanation`, {
      params: {
        model_version_id: `${model_version_id}`,
        explained_request_id,
        method,
        output_field,
      },
    });
  }
}
