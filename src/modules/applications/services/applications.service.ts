import { Injectable } from '@angular/core';

import { HttpService } from '@core/services/http';
import { environment } from '@environments/environment';
import { Application } from '@shared/models/_index';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable()
export class ApplicationsService {
  private baseApiUrl: string;

  constructor(private http: HttpService) {
    this.baseApiUrl = `${environment.apiUrl}/application`;
  }

  public getApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(this.baseApiUrl);
  }

  public updateApplication(application: Application): Observable<Application> {
    return this.http
      .put(this.baseApiUrl, application)
      .pipe(map((res: Response): any => res));
  }

  public addApplication(application: Application) {
    return this.http
      .post(this.baseApiUrl, application)
      .pipe(map((res: Response): any => res));
  }

  public generateInputs(appName: string) {
    return this.http
      .get(`${this.baseApiUrl}/generateInputs/${appName}`)
      .pipe(map((res: Response): any => res));
  }

  public deleteApplication(appName: string) {
    return this.http.delete(`${this.baseApiUrl}/${appName}`);
  }

  public serveService(data, applicationName: string): Observable<any> {
    const url = `/gateway/application/${applicationName}`;
    return this.http.post(url, data).pipe(map((res: Response): any => res));
  }
}
