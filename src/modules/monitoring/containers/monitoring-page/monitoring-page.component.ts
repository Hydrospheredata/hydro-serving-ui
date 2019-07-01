import { Component, OnInit } from '@angular/core';
import { HydroServingState, getSelectedMetrics } from '@core/reducers';
import { DialogService } from '@dialog/dialog.service';
import { getSelectedModelVersion } from '@models/reducers';
import { MetricsComponent } from '@monitoring/containers/metrics/metrics.component';
import { Store } from '@ngrx/store';
import { ModelVersion, TimeInterval } from '@shared/_index';
import { MetricSpecification } from '@shared/models/metric-specification.model';
import { Observable, of, Subject } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
@Component({
  selector: 'hs-monitoring-page',
  templateUrl: './monitoring-page.component.html',
  styleUrls: ['./monitoring-page.component.scss'],
})
export class MonitoringPageComponent implements OnInit {
  selectedModelVersion$: Observable<ModelVersion>;
  selectedMetricSpecifications$: Observable<MetricSpecification[]>;
  metricsNotEmpty$: Observable<boolean>;

  timeInterval: TimeInterval;
  timeIntervalChange$: Subject<TimeInterval> = new Subject();

  live: boolean = true;

  constructor(
    private store: Store<HydroServingState>,
    private dialogService: DialogService
  ) {
    this.selectedModelVersion$ = this.store
      .select(getSelectedModelVersion)
      .pipe(filter(mv => !!mv));

    this.selectedMetricSpecifications$ = this.store
      .select(getSelectedMetrics)
      .pipe(filter(_ => !!_));
    this.metricsNotEmpty$ = this.selectedMetricSpecifications$.pipe(
      switchMap(metrics => of(metrics.length > 0))
    );
  }

  ngOnInit() {
  }

  onChangeTimeInterval(timeInterval: TimeInterval): void {
    if (timeInterval && timeInterval.from && timeInterval.to) {
      this.timeInterval = timeInterval;
      this.timeIntervalChange$.next(timeInterval);
    }
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

  onStopLive() {
    this.live = false;
  }
  onStartLive() {
    this.live = true;
  }
}
