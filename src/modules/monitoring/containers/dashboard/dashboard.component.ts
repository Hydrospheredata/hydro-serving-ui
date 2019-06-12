import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { getSelectedMetrics, HydroServingState } from '@core/reducers';
import { RequestResponseLogService } from '@core/services';
import {
  IMetricData,
  MonitoringService,
} from '@core/services/metrics/monitoring.service';
import { getSelectedModelVersion } from '@models/reducers';
import { Store } from '@ngrx/store';
import { ModelVersion, TimeInterval } from '@shared/_index';
import { MetricSpecification } from '@shared/models/metric-specification.model';
import {
  Observable,
  BehaviorSubject,
  of,
  combineLatest,
  throwError,
  Subject,
} from 'rxjs';
import { filter, exhaustMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'hs-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  metricSpecs$: Observable<MetricSpecification[]>;
  selectedModelVersion$: Observable<ModelVersion>;
  timeInterval: TimeInterval;

  onlyFailedReqstoreData: boolean = true;
  selectedTimeInterval$: Subject<TimeInterval> = new Subject();
  modelVersion$: any;
  updateLogButtonClick$: BehaviorSubject<any> = new BehaviorSubject('');
  logLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  log$: any;
  constructor(
    private store: Store<HydroServingState>,
    private reqResLogService: RequestResponseLogService
  ) {}

  ngOnInit() {
    this.modelVersion$ = this.store.select(getSelectedModelVersion);
    this.metricSpecs$ = this.store.select(getSelectedMetrics);
    this.selectedModelVersion$ = this.store.select(getSelectedModelVersion);

    this.log$ = combineLatest(
      this.selectedTimeInterval$,
      this.modelVersion$,
      this.metricSpecs$,
      this.updateLogButtonClick$
    ).pipe(
      filter(([mv, metricSpecifications]) => !!metricSpecifications && !!mv),
      exhaustMap(([timeInterval, modelVersion, metricSpecifications]) => {
        return this.reqResLogService
          .getLog({
            timeInterval,
            modelVersion,
            metricSpecifications,
          })
          .pipe(
            catchError(err => {
              console.error('err');
              return throwError(err);
            })
          );
      })
    );
  }

  onChangeTimeInterval(timeInterval: TimeInterval) {
    if (timeInterval && timeInterval.from && timeInterval.to) {
      this.timeInterval = timeInterval;
      this.selectedTimeInterval$.next(timeInterval);
    }
  }
}
