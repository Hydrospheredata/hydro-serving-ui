import { Injectable } from '@angular/core';
import { Observable, of, forkJoin, BehaviorSubject } from 'rxjs';
import {
  catchError,
  shareReplay,
  distinctUntilChanged,
  map,
} from 'rxjs/operators';
import { HttpService } from './data/services/http.service';
import { ServiceStatus } from '@app/core/data/types';
import { neitherNullNorUndefined, pluck } from '@app/utils';

const enum HydroServicesEndpoints {
  buildInfo = 'api/buildinfo',
  gateway = 'gateway/buildinfo',
  sonar = 'monitoring/buildinfo',
  rootcause = 'rootcause/buildinfo',
  stat = 'stat/buildinfo',
  visualization = 'visualization/buildinfo',
}

interface BuildInfo {
  [p: string]: any;
}

@Injectable({ providedIn: 'root' })
export class BuildInformationService {
  private buildInfo$: Observable<BuildInfo>;
  private buildInfo: BehaviorSubject<{
    [serviceName: string]: any;
  }> = new BehaviorSubject<BuildInfo>({});

  constructor(private http: HttpService) {
    this.buildInfo$ = this.buildInfo
      .asObservable()
      .pipe(neitherNullNorUndefined, shareReplay(1));
  }

  loadBuildInformation() {
    const toRequest = endpoint =>
      this.http.get(endpoint).pipe(
        map(res => {
          return { ...res, status: ServiceStatus.AVAILABLE };
        }),
        catchError(err => this.handleError(err))
      );

    return forkJoin({
      build: toRequest(HydroServicesEndpoints.buildInfo),
      gateway: toRequest(HydroServicesEndpoints.gateway),
      sonar: toRequest(HydroServicesEndpoints.sonar),
      rootcause: toRequest(HydroServicesEndpoints.rootcause),
      stat: toRequest(HydroServicesEndpoints.stat),
      visualization: toRequest(HydroServicesEndpoints.visualization),
    }).subscribe(infos => this.buildInfo.next(infos));
  }

  getBuildInfo(): Observable<BuildInfo> {
    return this.buildInfo$.pipe(distinctUntilChanged());
  }

  getStatus<K extends keyof typeof HydroServicesEndpoints>(
    serviceName: K
  ): Observable<{ status: ServiceStatus; message: string }> {
    return this.buildInfo$.pipe(pluck(serviceName));
  }

  private handleError(error: string): Observable<any> {
    const is501Error = /501/i.test(error);

    if (is501Error) {
      return of({ status: ServiceStatus.CLOSED_FOR_OSS });
    } else {
      const errMsg = error || 'Something went wrong';
      return of({ status: ServiceStatus.FAILED, message: errMsg });
    }
  }
}
