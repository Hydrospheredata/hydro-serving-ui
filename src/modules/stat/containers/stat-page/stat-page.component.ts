import { Component } from '@angular/core';
import { StatService } from "../../services/stat.service";
import { BehaviorSubject, Observable, of } from "@node_modules/rxjs";
import { Stat } from "../../models";
import { catchError } from "@node_modules/rxjs/internal/operators";
import { ModelVersion } from "@shared/models";

@Component({
  templateUrl: './stat-page.component.html',
  styleUrls: ['./stat-page.component.scss'],
  providers: [StatService]
})
export class StatPageComponent {
  stat$: Observable<Stat>;
  error$: Observable<string>;
  modelVersion$: Observable<ModelVersion>;
  private error: BehaviorSubject<string> = new BehaviorSubject<string>(undefined)

  constructor(private statService: StatService) {
    this.modelVersion$ = this.statService.modelVersion$;
    this.error$ = this.error.asObservable();
    this.stat$ = this.statService.stat$.pipe(catchError(err => {
      this.error.next(err)
      return of(null)
    }))
  }
}
