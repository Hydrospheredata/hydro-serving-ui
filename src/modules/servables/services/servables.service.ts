import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import {
  scan,
  finalize,
  publish,
  refCount,
  catchError,
} from 'rxjs/operators';
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
    return this.http.get<Servable>(`${this.url}/${name}`);
  }

  getLog(name: string): Observable<string[]> {
    let eventSource: EventSource;

    const logStream$ = new Observable<string>(subscribe => {
      const { host, apiUrl, production } = environment;
      const { protocol, port, hostname } = window.location;

      if (production) {
        eventSource = new EventSource(
          `${protocol}//${hostname}:${port}${apiUrl}/servable/${name}/logs?follow=true`,
          {
            withCredentials: true,
          }
        );
      } else {
        eventSource = new EventSource(
          `${host}${apiUrl}/servable/${name}/logs?follow=true`,
          {
            withCredentials: true,
          }
        );
      }

      eventSource.addEventListener('EndOfStream', () => {
        eventSource.close();
        subscribe.complete();
      });

      eventSource.onmessage = ({ data }) => {
        if (data) {
          subscribe.next(data);
        }
      };

      eventSource.onerror = err => {
        subscribe.error();
      };
    });

    return logStream$.pipe(
      scan((log, curString) => {
        return [...log, curString];
      }, []),
      publish(),
      refCount(),
      finalize(() => {
        eventSource.close();
      })
    );
  }
}
