import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { scan, publish, refCount, finalize } from 'rxjs/operators';

@Injectable()
export class ModelVersionLogService {
  getLog(modelVersionId) {
    let eventSource: EventSource;
    const logStream$ = new Observable(subscribe => {
      const { host, apiUrl, production } = environment;
      const { protocol, port, hostname } = window.location;
      if (production) {
        eventSource = new EventSource(
          `${protocol}//${hostname}:${port}${apiUrl}/model/version/${modelVersionId}/logs`,
          {
            withCredentials: true,
          }
        );
      } else {
        eventSource = new EventSource(
          `${host}${apiUrl}/model/version/${modelVersionId}/logs`,
          {
            withCredentials: true,
          }
        );
      }

      eventSource.addEventListener('Log', (message: MessageEvent) => {
        subscribe.next(message.data);
      });

      eventSource.addEventListener('EndOfStream', () => {
        console.log('event stream closed by EndOfStream message');
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
        console.log('event stream closed');
      })
    );
  }
}
