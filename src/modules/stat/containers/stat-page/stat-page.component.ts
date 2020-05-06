import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject, Observable, of } from '@node_modules/rxjs';
import { catchError } from '@node_modules/rxjs/internal/operators';
import { ModelVersion } from '@shared/models';
import { Stat } from '../../models';
import { StatFacade } from '../../stat.facade';

@Component({
  templateUrl: './stat-page.component.html',
  styleUrls: ['./stat-page.component.scss'],
  providers: [StatFacade],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatPageComponent implements OnInit {
  stat$: Observable<Stat>;
  error$: Observable<string>;
  modelVersion$: Observable<ModelVersion>;
  private error: BehaviorSubject<string> = new BehaviorSubject<string>(
    undefined
  );

  constructor(private statFacade: StatFacade) {}

  ngOnInit() {
    this.modelVersion$ = this.statFacade.getModelVersion();
    this.error$ = this.error.asObservable();
    this.stat$ = this.statFacade.getStat().pipe(
      catchError(err => {
        this.error.next(err);
        return of(null);
      })
    );
  }
}
