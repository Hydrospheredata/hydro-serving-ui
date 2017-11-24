import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpService } from './http.service';
import { Model } from '@shared/_index';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class ModelsService {
  baseAPIUrl: string;
  baseUIUrl: string;

  constructor(
    private http: HttpService
  ) {
      this.baseAPIUrl = `${environment.apiUrl}/model`;
      this.baseUIUrl = `${environment.uiUrl}/model`;
  }

  getModels() {
      return this.http.get(`${this.baseUIUrl}/withInfo`)
          .map((res: Response): any => {
              return res.json();
          });
  }

  getModelWithInfo(id: string) {
      return this.http.get(`${this.baseUIUrl}/withInfo/${id}`)
          .map((res: Response): any => {
              return res.json();
          });

  }

  updateModel(model): Observable<Model> {
      return this.http.put(this.baseAPIUrl, model);
  }

  addModel(model: Model) {
      return this.http.post(this.baseAPIUrl, model);
  }

  deleteModel(id: string) {
      return this.http.delete(`${this.baseAPIUrl}/${id}`);
  }

}
