import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { publish, refCount } from 'rxjs/operators';

@Injectable()
export class VisualizationService {
  constructor(private http: HttpClient) {}
  getData$() {
    return this.http
      .get('http://0.0.0.0:1990/vis/vis.json')
      .pipe(publish(), refCount());
  }
}
