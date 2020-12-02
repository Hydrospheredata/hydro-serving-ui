import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';

import { HttpService } from './http.service';

@Injectable({ providedIn: 'root' })
export class ProfilerService {
  private readonly baseAPIUrl: string;

  constructor(private http: HttpService) {
    this.baseAPIUrl = `${environment.monitoringUrl}`;
  }

  public getFields(modelVersionId: string): Observable<string[]> {
    return this.http.get<string[]>(
      `${this.baseAPIUrl}/fields/${modelVersionId}`
    );
  }

  public getProfiles(modelVersionId: number, fieldName: string) {
    return this.http
      .get(`${this.baseAPIUrl}/profiles/${modelVersionId}/${fieldName}`)
      .pipe(map((res: Response): any => res));
  }

  public getProfilerServiceStatus() {
    return this.http.get(`${this.baseAPIUrl}/buildinfo`);
  }
}
