import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http';
import { Observable, of, forkJoin } from 'rxjs';
import { combineLatest } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class BuildInformationService {
  private buildInfoApi = '/api/buildinfo';
  private gatewayInfoApi = '/gateway/buildinfo';
  private sonarApi = '/monitoring/buildinfo';
  private rootcauseApi = '/rootcause/buildInfo';

  constructor(private http: HttpService) {}

  getBuildInformation(): Observable<any> {
    const toRequest = endpoint =>
      this.http.get(endpoint).pipe(catchError(_ => of([])));

    return forkJoin({
      build: toRequest(this.buildInfoApi),
      gateway: toRequest(this.gatewayInfoApi),
      sonar: toRequest(this.sonarApi),
      // rootcause: toRequest(this.rootcauseApi),
    });
  }
}
