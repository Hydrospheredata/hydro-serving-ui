import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

import { HttpService } from '@app/core/data/services/http.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DeploymentConfig } from '../types';

@Injectable({
  providedIn: 'root',
})
export class DeploymentConfigsService {
  private readonly baseAPIUrl: string;

  constructor(private http: HttpService) {
    this.baseAPIUrl = `${environment.apiUrl}/deployment_configuration`;
  }

  public getAll(): Observable<DeploymentConfig[]> {
    return this.http.get<DeploymentConfig[]>(this.baseAPIUrl);
  }

  public get(name: string): Observable<DeploymentConfig> {
    return this.http.get<DeploymentConfig>(`${this.baseAPIUrl}/${name}`);
  }

  public addConfig(config: DeploymentConfig) {
    return this.http
      .post(this.baseAPIUrl, config)
      .pipe(map((res: Response): any => res));
  }

  public delete(name: string): Observable<any> {
    return this.http.delete(`${this.baseAPIUrl}/${name}`);
  }
}
