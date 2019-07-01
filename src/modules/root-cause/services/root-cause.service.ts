import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http';
import { Observable, of, throwError } from 'rxjs';
import { Explanation } from '../models';
@Injectable({
  providedIn: 'root',
})
export class RootCauseService {
  constructor(private http: HttpService) {}

  getExplanation(): Observable<Explanation> {
    return of(
      new Explanation({
        coverage: 0.001,
        explanation:
          `Hours per week > 36.0 AND
           Capital Loss == None AND
           Sex ==  Male AND
           Education == Prof-School AND
           Workclass ==  Local-gov`,
        precision: 1.0,
      })
    );
  }
}
