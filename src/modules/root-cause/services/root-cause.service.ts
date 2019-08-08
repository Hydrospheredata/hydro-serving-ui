import { HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http';
import { environment } from '@environments/environment';
import { ExplanationRequestBody } from '@rootcause/interfaces';
import { Explanation, ExplanationType } from '@rootcause/models';
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

  queueExplanation(
    body: ExplanationRequestBody,
    explanationType: ExplanationType
  ): Observable<string> {
    const url = `${this.url}/${explanationType} `;
    return this.http.post(url, body, { observe: 'response' }).pipe(
      map(response => {
        const resp = response as HttpResponseBase;
        const rurl = resp.headers.get('Location');
        const urlArr = rurl.split('/');
        const jobId = urlArr[urlArr.length - 1];
        return jobId;
      })
    );
  }

  getJobStatus(
    jobId: string,
    explanationType: ExplanationType
  ): Observable<{
    result?: string;
    state: string;
    description?: string;
    progress?: number;
  }> {
    return this.http.get(`${this.url}/status/${explanationType}/${jobId}`);
  }

  getResult(resultId: string, explanationType: ExplanationType): Observable<Explanation> {
    return this.http.get(`${this.url}/fetch_result/${explanationType}/${resultId}`);
  }
}
