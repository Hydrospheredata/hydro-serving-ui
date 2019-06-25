import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Subject, merge, Observable } from 'rxjs';
import { startWith, scan, bufferTime } from 'rxjs/operators';

@Injectable()
export class ModelVersionLogService {
  message: Subject<string> = new Subject<string>();
  eventSource: EventSource;

  getLog(modelVersionId) {

    const myObservable = new Observable(subscribe => {
      const { host, apiUrl } = environment;
      const eventSource = new EventSource(
        `${host}${apiUrl}/model/version/${modelVersionId}/logs`,
        {
          withCredentials: true,
        }
      );

      eventSource.addEventListener('Log', (message: MessageEvent) => {
        subscribe.next(message.data);
      });

      eventSource.addEventListener('EndOfStream', () => {
        eventSource.close();
        subscribe.complete();
      });

      eventSource.onerror = err => {
        console.error(err);
        subscribe.error(err);
      };
    });

    return merge(myObservable).pipe(
      bufferTime(1000),
      scan((acc, cur) => {
        return [...acc, ...cur];
      }, []),
      startWith([])
    );
  }
}
