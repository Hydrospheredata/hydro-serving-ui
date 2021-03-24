import { Injectable } from '@angular/core';
import { HttpService } from '@app/core/data/services/http.service';
import { Observable, of, forkJoin, BehaviorSubject } from 'rxjs';
import { catchError, shareReplay, distinctUntilChanged } from 'rxjs/operators';
import { ModelVersion } from '@app/core/data/types';

export interface ServiceSupported {
  supported: boolean;
  message: string;
  description?: string;
}

export interface ModelVersionServicesStatus {
  [serviceName: string]: ServiceSupported
}

const enum ServicesEndpoints {
  stat = 'stat/support',
  visualization = 'visualization/supported',
}

@Injectable({
  providedIn: 'root',
})
export class ServicesSupportService {
  servicesSupport$: Observable<ModelVersionServicesStatus>;

  private servicesSupport: BehaviorSubject<{
    [serviceName: string]: any;
  }> = new BehaviorSubject<ModelVersionServicesStatus>({});

  constructor(private http: HttpService) {
    this.servicesSupport$ = this.servicesSupport
      .asObservable()
      .pipe(distinctUntilChanged(), shareReplay(1));
  }

  loadSupported(modelVersion: ModelVersion): void {
    console.log(modelVersion.id);
    const toRequest = endpoint =>
      this.http
        .get(endpoint, { params: { model_version_id: `${modelVersion.id}` } })
        .pipe(catchError(err => this.handleError(err)));

    forkJoin({
      stat: toRequest(ServicesEndpoints.stat),
      visualization: toRequest(ServicesEndpoints.visualization),
    }).subscribe(res => {this.servicesSupport.next(res)});
  }

  getServiceSupported(): Observable<ModelVersionServicesStatus> {
    return this.servicesSupport$;
  }

  private handleError(error: string): Observable<ServiceSupported> {
    const is501Error = /501/i.test(error);
    if (is501Error) {
      return of({ supported: false, message: 'Closed for OSS' });
    } else {
      const errMsg = error || 'Something went wrong';
      return of({ supported: false, message: errMsg });
    }
  }
}
