import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpService } from '@core/services/http/_index';

@Injectable()
export class ProfilerService {

  private baseAPIUrl: string;

  constructor(private http: HttpService) {
    this.baseAPIUrl = `${environment.profilerUrl}`;
  }

  public getFields(modelVersionId: number) {
    return this.http.get(`${this.baseAPIUrl}/fields/${modelVersionId}`)
            .map((res: Response): any => {
                return res.json();
            });
  }

  public getProfiles(modelVersionId: number, fieldName: string) {
    return this.http.get(`${this.baseAPIUrl}/profiles/${modelVersionId}/${fieldName}`, null, false)
            .map((res: Response): any => {
                return res.json();
            });
  }
}