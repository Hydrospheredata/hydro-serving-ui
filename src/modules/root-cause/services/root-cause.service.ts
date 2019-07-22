import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http';
import { environment } from '@environments/environment';
import { ExplanationRequestBody } from '@rootcause/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RootCauseService {
  private url: string;
  constructor(private http: HttpService) {
    this.url = environment.reqstoreUrl;
  }

  getExplanation(body: ExplanationRequestBody): Observable<any> {
    const url = `${this.url}/rise`;
    return this.http.post(url, body);
  }
}
