import { Injectable } from '@angular/core';
import { HS_BASE_URL } from '@core/base-url.token';
import { Inject } from '@node_modules/@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { scan, publish, refCount, finalize } from 'rxjs/operators';

@Injectable()
export class ModelVersionLogService {
  constructor(@Inject(HS_BASE_URL) private baseUrl: string) {}
  getLog(modelVersionId) {
    let eventSource: EventSource;
    const logStream$ = new Observable(subscribe => {
      const { apiUrl } = environment;
      const url = `${this.baseUrl}${apiUrl}/model/version/${modelVersionId}/logs`;

      eventSource = new EventSource(url, {
        withCredentials: true,
      });

      eventSource.addEventListener('Log', (message: MessageEvent) => {
        subscribe.next(message.data);
      });

      eventSource.addEventListener('EndOfStream', () => {
        eventSource.close();
        subscribe.complete();
      });

      eventSource.onerror = err => {
        subscribe.error(err);
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
