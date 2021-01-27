import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';

import { Observable } from 'rxjs';
import { scan, finalize, share } from 'rxjs/operators';

import { environment } from 'environments/environment';
import { HS_BASE_URL } from '@app/core/base-url.token';

type logType = 'servable' | 'model-version';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(@Inject(HS_BASE_URL) private baseUrl: string) { }

  getLog(type: logType, param: string): Observable<string> {
    let eventSource: EventSource;

    const logStream$ = new Observable<string>(subscribe => {
      const { apiUrl } = environment;
      let url: string;

      switch(type) {
        case 'servable':
          url = `${this.baseUrl}${apiUrl}/servable/${param}/logs?follow=true`;
        case 'model-version':
          url = `${this.baseUrl}${apiUrl}/model/version/${param}/logs?follow=true`;
      }
      eventSource = new EventSource(url, {
        withCredentials: true,
      });

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
        subscribe.error(err);
      };
    });

    return logStream$.pipe(
      share(),
      finalize(() => {
        eventSource.close();
      })
    );
  }
}
