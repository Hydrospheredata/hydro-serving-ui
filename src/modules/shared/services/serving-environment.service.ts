import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpService } from './http.service';
import { ServingEnvironment } from '@shared/_index';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class ServingEnvironmentService {
  baseAPIUrl: string;
  baseUIUrl: string;

  constructor(
    private http: HttpService
  ) {
    this.baseAPIUrl = `${environment.apiUrl}/servingEnvironment`;
    this.baseUIUrl = `${environment.uiUrl}/servingEnvironment`;
  }

  getEnvironments() {
    return this.http.get(`${this.baseAPIUrl}`)
      .map((res: Response): any => {
        return res.json();
      });
  }
  createEnvironment(environment: ServingEnvironment) {
    return this.http.post(this.baseAPIUrl, environment);
  }

  deleteEnvironment(environment: ServingEnvironment) {
    return this.http.delete(`${this.baseAPIUrl}/${environment.id}`);
  }

}
