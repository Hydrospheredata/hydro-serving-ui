import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { GetMetricsAction } from '@core/actions/monitoring.actions';
import { HydroServingState } from '@core/reducers';
import { TimemachineService } from '@core/services/timemachine.service';
import { getSiblingVersions } from '@models/reducers';
import { Store } from '@ngrx/store';
import { IModelVersion } from '@shared/_index';
import { Observable, Subject, fromEvent } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'hs-timemachine',
  templateUrl: './timemachine.component.html',
  styleUrls: ['./timemachine.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimemachineComponent implements OnInit {

  get mv() {
    return this.modelVer;
  }
  set mv(id) {
    this.loadDataFromModelersionWithId$.next(id);
    this.modelVer = id;
  }
  siblingModelVersions$: Observable<IModelVersion[]>;
  loadDataFromModelersionWithId$: Subject<number> = new Subject();

  @ViewChild('loadDataButton', { read: ElementRef}) loadDataButton: ElementRef<HTMLElement>;

  metrics = [
    {
      id: '0ba1b8a1-844f-43ec-9bfb-b1e75488880a',
      name: 'c',
      modelVersionId: 1,
      kind: 'CounterMetricSpec',
      withHealth: true,
    },
    {
      id: '1f26a809-56aa-40ee-a6e3-329ff8133d7c',
      name: 'c',
      modelVersionId: 2,
      kind: 'CounterMetricSpec',
      withHealth: true,
    },
];

  private modelVer;
  private onClickLoadButton$;

  constructor(
    private store: Store<HydroServingState>,
    private timemachineService: TimemachineService
  ) {}

  ngOnInit(
  ) {
    this.siblingModelVersions$ = this.store.select(getSiblingVersions);
    this.onClickLoadButton$ = fromEvent(this.loadDataButton.nativeElement, 'click').pipe(
      tap(() => this.loadMetrics()),
      switchMap(() => this.adventureTime())
    );

    this.onClickLoadButton$.subscribe();
  }

  adventureTime(): Observable<any> {
    return this.timemachineService.travel({
      modelVersionFrom: '1',
      modelNameTo: 'claims_model',
      versionTo: '2',
      from: '0',
      till: '8559030671000000000',
    });
  }

  loadMetrics(): void {
    this.store.dispatch(new GetMetricsAction(this.modelVer));
  }
}
