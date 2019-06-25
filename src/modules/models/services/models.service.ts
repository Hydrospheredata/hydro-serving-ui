import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http';
import { environment } from '@environments/environment';
import { ModelVersion } from '@shared/_index';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ModelsService {
  private baseAPIUrl: string;

  constructor(private http: HttpService) {
    this.baseAPIUrl = `${environment.apiUrl}/model`;
  }

  public getModels() {
    return this.http
      .get(this.baseAPIUrl)
      .pipe(map((res: Response): any => res));
  }

  public getAllVersions(): Observable<ModelVersion[]> {
    return this.http
      .get(`${this.baseAPIUrl}/version`)
      .pipe(map((res: Response): any => res));
  }

  public deleteModel(modelId) {
    return this.http.delete(`${this.baseAPIUrl}/${modelId}`);
  }
}
