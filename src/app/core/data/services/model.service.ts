import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { map } from '@node_modules/rxjs/operators';

import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class ModelService {
  private readonly baseAPIUrl: string;

  constructor(private http: HttpService) {
    this.baseAPIUrl = `${environment.apiUrl}/model`;
  }

  public getModels() {
    return this.http
      .get(this.baseAPIUrl)
      .pipe(map((res: Response): any => res));
  }

  public deleteModel(modelId) {
    return this.http.delete(`${this.baseAPIUrl}/${modelId}`);
  }
}
