import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { tap, filter, scan } from 'rxjs/operators';
import { Deployable } from '../interfaces';
import { Servable } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ServablesService {
  private url: string;

  constructor(private http: HttpService) {
    const { apiUrl, servableUrl } = environment;
    this.url = `${apiUrl}${servableUrl}`;
  }

  getAll(): Observable<Servable[]> {
    return this.http.get(this.url);
  }

  deploy(requestBody: Deployable): Observable<Servable> {
    return this.http.post(this.url, requestBody) as Observable<Servable>;
  }

  delete(name: string) {
    return this.http.delete(`${this.url}/${name}`);
  }

  get(name: string) {
    return this.http.get(`${this.url}/${name}`);
  }

  getLogs(name: string): Observable<string[]> {
    return this.http
      .get(`${this.url}/${name}/logs?follow=true`, {
        observe: 'events',
        reportProgress: true,
        responseType: 'text',
      })
      .pipe(
        filter(({ type }) => type === 3),
        scan((acc, { partialText }) => {
          return [...acc, ...partialText.split('\n')];
        }, [])
      );
  }
}
