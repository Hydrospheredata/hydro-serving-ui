import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { getSelectedMetrics, HydroServingState } from '@core/reducers';
import { RequestResponseLogService } from '@core/services';
import {
  IMetricData,
  MonitoringService,
} from '@core/services/metrics/monitoring.service';
import { DialogService } from '@dialog/dialog.service';
import { getSelectedModelVersion } from '@models/reducers';
import { MetricsComponent } from '@monitoring/containers/metrics/metrics.component';
import { Store } from '@ngrx/store';
import { ModelVersion, TimeInterval } from '@shared/_index';
import { MetricSpecification } from '@shared/models/metric-specification.model';
import {
  Observable,
  BehaviorSubject,
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

  maxMessages: number = 20;
  maxMBytes: number = 5;
  reverse: boolean = true;
  loadFailed: boolean = true;
  constructor(
    private store: Store<HydroServingState>,
    private reqResLogService: RequestResponseLogService,
    private dialogService: DialogService
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
            maxMBytes: this.maxMBytes,
            maxMessages: this.maxMessages,
            reverse: this.reverse,
            health: this.loadFailed ? 0 : undefined,
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

  onChangeTimeInterval(timeInterval: TimeInterval): void {
    if (timeInterval && timeInterval.from && timeInterval.to) {
      this.timeInterval = timeInterval;
      this.selectedTimeInterval$.next(timeInterval);
    }
  }

  updateReqstore(): void {
    this.updateLogButtonClick$.next('click');
  }

  openSettings() {
    this.dialogService.createDialog({
      component: MetricsComponent,
      styles: {
        width: '600px',
        padding: '0px',
      },
    });
  }
}
