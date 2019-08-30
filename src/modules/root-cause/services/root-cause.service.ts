import { HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http';
import { environment } from '@environments/environment';
import {
  ExplanationRequestBody,
  GetAllStatusesParams,
} from '@rootcause/interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RootCauseService {
  private url: string;
  constructor(private http: HttpService) {
    this.url = environment.rootCauseUrl;
  }

  createExplanationTask({
    requestBody,
    method,
  }: {
    requestBody: ExplanationRequestBody;
    method: string;
  }): Observable<string> {
    const url = `${this.url}/${method} `;
    return this.http.post(url, requestBody, { observe: 'response' }).pipe(
      map(response => {
        const resp = response as HttpResponseBase;
        const rurl = resp.headers.get('Location');
        const urlArr = rurl.split('/');
        const taskId = urlArr[urlArr.length - 1];
        return taskId;
      })
    );
  }

  getJobStatus({
    taskId,
    method,
  }: {
    taskId: string;
    method: string;
  }): Observable<{
    result?: string;
    state: string;
    description?: string;
    progress?: number;
  }> {
    return this.http.get(`${this.url}/task_status/${method}/${taskId}`);
  }

  getResult({
    result,
    method,
  }: {
    result: string;
    method: string;
  }): Observable<any> {
    return this.http.get(
      `${this.url}/fetch_result/${method}/${result}`
    );
  }

  getAllStatuses({
    model_name,
    model_version,
    ts,
    uid,
  }: GetAllStatusesParams): Observable<any> {
    return this.http.get(`${this.url}/status`, {
      params: { model_name, model_version, ts, uid },
    });
  }
}
