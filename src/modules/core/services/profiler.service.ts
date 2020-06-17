import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http';
import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProfilerService {
  private baseAPIUrl: string;

  constructor(private http: HttpService) {
    this.baseAPIUrl = `${environment.monitoringUrl}`;
  }

  public getFields(modelVersionId: string) {
    return this.http
      .get(`${this.baseAPIUrl}/fields/${modelVersionId}`)
      .pipe(map((res: Response): any => res));
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
