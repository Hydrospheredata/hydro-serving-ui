import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Application, ApplicationUpdateRequest } from '../types/application';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  private readonly baseApiUrl: string;

  constructor(private http: HttpService) {
    this.baseApiUrl = `${environment.apiUrl}/application`;
  }

  public getApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(this.baseApiUrl);
  }

  public updateApplication(
    application: ApplicationUpdateRequest,
  ): Observable<Application> {
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
    return this.http.get<string>(
      `${this.baseApiUrl}/generateInputs/${appName}`,
    );
  }

  public deleteApplication(appName: string) {
    return this.http.delete(`${this.baseApiUrl}/${appName}`);
  }

  public serveService(data, applicationName: string): Observable<any> {
    const url = `gateway/application/${applicationName}`;
    return this.http.post(url, data).pipe(map((res: Response): any => res));
  }
}
