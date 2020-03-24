import { Injectable } from '@angular/core';
import { ChartConfig, CustomCheck, Check } from '@monitoring/interfaces';
import { MonitoringService } from '@monitoring/services';
import { MonitoringPageFacade } from '@monitoring/store/facades';
import { ModelVersion } from '@shared/_index';
import { BehaviorSubject, Observable, forkJoin, combineLatest, of } from 'rxjs';
import {
  switchMap,
  map,
  share,
  pluck,
  tap,
  shareReplay,
  distinctUntilChanged,
} from 'rxjs/operators';

export type ComparisonRegime = 'split' | 'merge';
interface CustomMetricsState {
  regime: ComparisonRegime;
  compareWith: number[];
  comparableModelVersions: ModelVersion[];
  chartConfigs: Array<{ [metricName: string]: ChartConfig }>;
}

const initialState: CustomMetricsState = {
  regime: 'split',
  compareWith: [],
  comparableModelVersions: [],
  chartConfigs: [],
};

@Injectable()
export class CustomMetricsFacade {
  comparableModelVersionsIds$: Observable<number[]>;
  comparableCustomMetricsByModelVersionId$: Observable<{
    [modelVersionId: string]: {
      [metricName: string]: {
        data: number[];
        name: string;
      };
    };
  }>;
  // customMetrics$: Observable<Map<string, CustomCheck>>;
  customMetrics$: Observable<any>;
  chartConfigs$: Observable<Array<{ [metricName: string]: ChartConfig }>>;

  // NEW
  currentCustomChecks$: Observable<any>;
  regime$: Observable<ComparisonRegime>;
  comparableModelVersions$: Observable<ModelVersion[]>;
  private state$: Observable<CustomMetricsState>;
  private comparableModelVersions: BehaviorSubject<
    ModelVersion[]
  > = new BehaviorSubject([]);
  private state: BehaviorSubject<CustomMetricsState> = new BehaviorSubject(
    initialState
  );
  // NEW

  private comparableModelVersionsIds: BehaviorSubject<
    number[]
  > = new BehaviorSubject([]);

  constructor(
    private facade: MonitoringPageFacade,
    private monitoring: MonitoringService
  ) {
    this.comparableModelVersionsIds$ = this.comparableModelVersionsIds.asObservable();

    this.currentCustomChecks$ = combineLatest(
      this.facade.checks$,
      this.facade.customMetrics$
    ).pipe(
      map(([checks, metrics]) => {
        const metricsChecksTemplates = this.createMetricsChecks(metrics);
        const metricsChecks = this.fillMetricsCheksData(
          checks,
          metricsChecksTemplates
        );
        return metricsChecks;
      })
    );

    this.comparableCustomMetricsByModelVersionId$ = combineLatest(
      this.facade.selectedAggregation$,
      this.comparableModelVersionsIds
    ).pipe(
      switchMap(([selectedAggregation, ids]) => {
        const request: {
          [modelVersionId: number]: Observable<Check[]>;
        } = ids.reduce((req, id) => {
          req[id] = this.monitoring.getChecks({
            modelVersionId: id,
            from: selectedAggregation.additionalInfo._hs_first_id,
            to: selectedAggregation.additionalInfo._hs_last_id,
          });
          return req;
        }, {});
        return forkJoin(request);
      }),
      map((res: { [modelVersionId: number]: Check[] }) => {
        const result = {};
        for (const modelVersionId in res) {
          if (res.hasOwnProperty(modelVersionId)) {
            const checks = res[modelVersionId];
            if (result[modelVersionId] === undefined) {
              result[modelVersionId] = {};
            }
            checks.forEach(check => {
              const rawChecks = check._hs_metric_checks;

              for (const checkName in rawChecks) {
                if (rawChecks.hasOwnProperty(checkName)) {
                  const rawCheck = rawChecks[checkName];

                  if (result[modelVersionId][checkName] === undefined) {
                    result[modelVersionId][checkName] = {
                      data: [],
                      name: checkName,
                    };
                  }

                  result[modelVersionId][checkName].data.push(rawCheck.value);
                }
              }
            });
          }
        }

        return result;
      })
    );

    // NEW
    this.state$ = this.state.asObservable().pipe(shareReplay(1));
    this.regime$ = this.state$.pipe(pluck('regime'), distinctUntilChanged());
    this.chartConfigs$ = this.state$.pipe(pluck('chartConfigs'));

    combineLatest(this.state$, this.currentCustomChecks$)
      .pipe(
        tap(([state, customChecks]) => {
          const currentState = state;
          this.state.next({
            ...currentState,
            chartConfigs: this.mergeChecksToChartConfig(customChecks),
          });
        })
      )
      .subscribe();
    // NEW
  }

  comparableModelVersionsChanged(modelVersions: ModelVersion[]): void {
    this.comparableModelVersions.next(modelVersions);
  }

  changeRegime(): void {
    const state = this.state.getValue();
    const currentRegime = state.regime;
    const regime = currentRegime === 'split' ? 'merge' : 'split';
    this.state.next({ ...state, regime });
  }

  private splitChectToChartConfigs(
    customCheks: Map<string, CustomCheck>,
    compCheksByModelVersionId: any
  ): Array<{ [metricName: string]: ChartConfig }> {
    const result = [];
    const size: ChartConfig['size'] = {
      width: 300,
      height: 240,
      margins: {
        left: 40,
        right: 20,
        top: 10,
        bottom: 24,
      },
    };

    const currentConfigs = {};
    for (const item of customCheks) {
      const [uid, check] = item;
      currentConfigs[check.name] = {
        size,
        data: {
          'adult_scalar:1': {
            color: 'blue',
            x: check.data.map((_, i) => i + 1),
            y: check.data,
          },
        },
        name: check.name,
        plotBands: [],
      };
    }
    result.push(currentConfigs);
    for (const modelVersionId in compCheksByModelVersionId) {
      if (compCheksByModelVersionId.hasOwnProperty(modelVersionId)) {
        const currentConfig = {} as any;
        const currentChecks = compCheksByModelVersionId[modelVersionId];
        for (const i in currentChecks) {
          if (currentChecks.hasOwnProperty(i)) {
            const check = currentChecks[i];
            if (currentConfig[check.name] === undefined) {
              currentConfig.name = {
                size,
                data: {
                  [modelVersionId]: {
                    color: 'blue',
                    x: check.data.map((_, i) => i + 1),
                    y: check.data,
                  },
                },
                name: check.name,
                plotBands: [],
              };
            }
          }
        }
        result.push(currentConfig);
      }
    }

    return result;
  }
  private mergeChecksToChartConfig(
    customCheks: Map<string, CustomCheck>
    // compCheks: any
  ): Array<{ [metricName: string]: ChartConfig }> {
    const result: Array<{ [metricName: string]: ChartConfig }> = [{}];
    const size: ChartConfig['size'] = {
      width: 1080,
      height: 300,
      margins: {
        left: 40,
        right: 20,
        top: 10,
        bottom: 24,
      },
    };

    for (const item of customCheks) {
      const [uid, check] = item;
      if (result[0][check.name] === undefined) {
        result[0][check.name] = {
          size,
          data: {
            'adult_scalar:1': {
              color: 'blue',
              x: check.data.map((_, i) => i + 1),
              y: check.data,
            },
          },
          name: check.name,
          plotBands: [],
        };
      }
    }

    // for (const modelVersionId in compCheks) {
    //   if (compCheks.hasOwnProperty(modelVersionId)) {
    //     const checks = compCheks[modelVersionId];
    //     for (const metricName in checks) {
    //       if (checks.hasOwnProperty(metricName)) {
    //         const check = checks[metricName];
    //         if (result[0][check.name] === undefined) {
    //           result[0].name = {
    //             size,
    //             data: {
    //               [modelVersionId]: {
    //                 color: 'blue',
    //                 x: check.data.map((_, i) => i + 1),
    //                 y: check.data,
    //               },
    //             },
    //             name: check.name,
    //             plotBands: [],
    //           };
    //         } else {
    //           result[0][check.name] = {
    //             ...result[0][check.name],
    //             data: {
    //               ...result[0][check.name].data,
    //               [modelVersionId]: {
    //                 color: 'red',
    //                 x: check.data.map((_, i) => i + 1),
    //                 y: check.data,
    //               },
    //             },
    //           };
    //         }
    //       }
    //     }
    //   }
    // }

    return result;
  }

  private createMetricsChecks(metrics) {
    const metricCheksTemplate: Array<[string, CustomCheck]> = metrics.map(
      ({ id, name, config: { threshold } }) =>
        [id, { data: [], name, threshold, health: [] }] as [string, CustomCheck]
    );
    return new Map(metricCheksTemplate);
  }
  private fillMetricsCheksData(checks, metricsChecks) {
    debugger;
    // TODO: mutable
    // const updateValue = (check: CustomCheck, value, health) => {
    //   return {
    //     ...check,
    //     data: [...check.data, value],
    //     health: [...check.health, health],
    //   };
    // };

    // checks.forEach(check => {
    //   const overall = Object.values(check._hs_metric_checks || {});
    //   overall.forEach(({ metricSpecId, value, check: health }) => {
    //     if (metricsChecks.has(metricSpecId)) {
    //       metricsChecks.set(
    //         metricSpecId,
    //         updateValue(metricsChecks.get(metricSpecId), value, health)
    //       );
    //     }
    //   });
    // });
    let res: { [metricName: string]: any };
    checks.forEach(check => {
      for (const metricName in check) {
        if (check.hasOwnProperty(metricName)) {
          const metricCheck = checks._hs_metric_checks[metricName];
          if (res[metricName] === undefined) {
            res[metricName] = {};
          }
        }
      }
    })



    debugger;
    return [];

    return metricsChecks;
  }
}
