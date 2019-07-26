import { HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http';
import { environment } from '@environments/environment';
import { ExplanationRequestBody } from '@rootcause/interfaces';
import { Explanation } from '@rootcause/models';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RootCauseService {
  private url: string;
  constructor(private http: HttpService) {
    this.url = environment.rootCauseUrl;
  }
  getExplanation(body: ExplanationRequestBody): Observable<string> {
    const url = `${this.url}/rise`;
    return this.http.post(url, body, { observe: 'response' }).pipe(
      map(response => {
        const resp = response as HttpResponseBase;
        const rurl =
          resp.headers.get('Location') ||
          `http://localhost/status/rise/06fb10cd-5359-45d5-9df1-3f398b32d1bc`;

        return rurl;
      })
    );
  }

  getStatus(url: string): Observable<{ result: string; state: string }> {
    const x = url.split('/');
    const id = '62d2154d-3611-463c-a6eb-607fe6d0c16e';

    return this.http.get(`${this.url}/status/rise/${id}`);
  }

  a(endpoint: string): Observable<Explanation> {
    return this.http.get(`${this.url}${endpoint}`);
  }
}
