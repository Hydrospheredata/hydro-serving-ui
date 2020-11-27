import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ModelVersion } from '@app/core/data/types/model-version';
import { environment } from '@environments/environment';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class ModelVersionService {
  private readonly baseAPIUrl: string;

  constructor(private readonly http: HttpService) {
    this.baseAPIUrl = `${environment.apiUrl}/model`;
  }

  public getAllVersions(): Observable<ModelVersion[]> {
    return this.http
      .get(`${this.baseAPIUrl}/version`)
      .pipe(map((res: Response): any => res));
  }
}
