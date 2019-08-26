import { Component, OnDestroy } from '@angular/core';
import {
  HydroServingState,
  getSelectedMetrics,
  isMetricsLoading,
} from '@core/reducers';
import { DialogService } from '@dialog/dialog.service';
import { MetricsComponent } from '@monitoring/containers/metrics/metrics.component';
import { MonitoringPageFacade } from '@monitoring/store/facades';
import { TimeInterval } from '@shared/_index';
import { isEqual } from 'lodash';
import { combineLatest, EMPTY, timer, Subscription } from 'rxjs';
import { filter, switchMap, tap, pairwise } from 'rxjs/operators';

@Component({
  selector: 'hs-monitoring-page',
  templateUrl: './monitoring-page.component.html',
  styleUrls: ['./monitoring-page.component.scss'],
})
export class MonitoringPageComponent implements OnDestroy {
  selectedModelVersion$ = this.monitoringPageFacade.selectedModelVersion$;
  metrics$ = this.monitoringPageFacade.metrics$;
  fullAggregation$ = this.monitoringPageFacade.fullAggregation$;
  detailedAggregation$ = this.monitoringPageFacade.detailedAggregation$;
  timeInterval$ = this.monitoringPageFacade.timeInterval$;
  detailedTimeInterval$ = this.monitoringPageFacade.detailedTimeInterval$;
  sonarData$ = this.monitoringPageFacade.sonarData$;
  detailedCharts$ = this.monitoringPageFacade.detailedCharts$;
  reqResLog$ = this.monitoringPageFacade.reqResLog$;
  isLive$ = this.monitoringPageFacade.isLive$;
  siblingModelVersions$ = this.monitoringPageFacade.siblingModelVersions$;
  comparedMetricSpecs$ = this.monitoringPageFacade
    .comparedMetrocSpecifications$;
  timeBound$ = this.monitoringPageFacade.timeBound$;

  s1: Subscription;
  s2: Subscription;
  s3: Subscription;
  s4: Subscription;
  s5: Subscription;

  constructor(
    private dialogService: DialogService,
    private monitoringPageFacade: MonitoringPageFacade
  ) {
    this.s1 = this.selectedModelVersion$
      .pipe(tap(({ id }) => this.monitoringPageFacade.loadMetrics(id)))
      .subscribe();

    this.s2 = combineLatest(this.metrics$, this.isLive$, this.timeBound$)
      .pipe(
        filter(([metrics]) => {
          return metrics !== undefined && metrics.length > 0;
        }),
        switchMap(([, isLive, timeBound]) => {
          if (isLive && timeBound === 0) {
            return timer(0, 5000).pipe(
              tap(() => {
                this.monitoringPageFacade.loadFullAggregation({
                  timeBoundary: 0,
                });
              })
            );
          } else {
            return EMPTY;
          }
        })
      )
      .subscribe();

    this.s3 = this.fullAggregation$
      .pipe(
        pairwise(),
        filter(([prevLog, newLog]) => {
          const recievedNewData = !isEqual(prevLog, newLog);
          return recievedNewData;
        })
      )
      .subscribe(([, newLog]) => {
        const [
          from,
          to,
        ] = this.monitoringPageFacade.getMinimumAndMaximumTimestamps(newLog);
        this.monitoringPageFacade.setTimeInterval({ from, to });
      });

    this.timeInterval$.subscribe(timeInterval => {
      this.monitoringPageFacade.loadSonarData();
      this.monitoringPageFacade.loadDetailedAggregation({ timeInterval });
    });

    this.detailedTimeInterval$.subscribe(timeInterval => {
      this.monitoringPageFacade.loadDetailedAggregation({ timeInterval });
    });

    this.s4 = this.comparedMetricSpecs$
      .pipe(
        switchMap(() => timer(0, 10000)),
        tap(() => this.monitoringPageFacade.loadComparedSonarData())
      )
      .subscribe();

    this.s5 = this.timeBound$
      .pipe(
        switchMap(timeBound => {
          if (timeBound) {
            return timer(0, 10000).pipe(tap(() => {
              const to = new Date().getTime();
              const from = to - timeBound;
              this.monitoringPageFacade.setTimeInterval({ from, to});
            }));
          } else {
            return EMPTY;
          }
        })
      )
      .subscribe();
  }

  onChangeTimeInterval(timeInterval: TimeInterval): void {
    if (timeInterval && timeInterval.from && timeInterval.to) {
      const { from, to } = timeInterval;
      this.monitoringPageFacade.setDetailedTimeInterval({ from, to });
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
    this.monitoringPageFacade.stopAutoUpdate();
  }
  onStartLive() {
    this.monitoringPageFacade.startAutoUpdate();
  }

  setTimeBound(timeBound: number) {
    this.monitoringPageFacade.setTimeBound({ timeBound });
  }

  loadReqstore(params: {
    maxMBytes: number;
    maxMessages: number;
    reverse: boolean;
  }) {
    this.monitoringPageFacade.loadReqstoreData(params);
  }

  addModelVersionIdToCompare(params: {
    modelVersionId: number;
    metricSpecId: string;
    metricSpecKind: string;
  }) {
    this.monitoringPageFacade.addModelVersionIdToCompare(params);
  }

  ngOnDestroy() {
    this.s1.unsubscribe();
    this.s2.unsubscribe();
    this.s3.unsubscribe();
    this.s4.unsubscribe();
    this.monitoringPageFacade.clear();
  }
}
