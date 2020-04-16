import { Injectable } from '@angular/core';
import { ModelsFacade } from '@models/store';
import {
  ChartConfig,
  Check,
  ChecksAggregationItem,
} from '@monitoring/interfaces';
import { MonitoringService } from '@monitoring/services';
import { MonitoringPageFacade } from '@monitoring/store/facades';
import { ModelVersion } from '@shared/_index';
import { BehaviorSubject, Observable, forkJoin, combineLatest, of } from 'rxjs';
import { switchMap, map, startWith } from 'rxjs/operators';

export type ComparisonRegime = 'split' | 'merge';
interface ModelVersionMetricsChecks {
  id: number;
  name: string;
  version: number;
  metricsChecks: {
    [metricName: string]: {
      data: number[];
      threshold: number;
      health: boolean[];
    };
  };
}

@Injectable()
export class CustomMetricsFacade {
  customMetrics$: Observable<any>;
  chartConfigs$: Observable<Array<{ [metricName: string]: ChartConfig }>>;
  currentCustomChecks$: Observable<any>;
  regime$: Observable<ComparisonRegime>;
  comparableModelVersions$: Observable<ModelVersion[]>;
  private regime: BehaviorSubject<ComparisonRegime> = new BehaviorSubject(
    'merge' as ComparisonRegime
  );
  private comparableModelVersions: BehaviorSubject<
    ModelVersion[]
  > = new BehaviorSubject([]);
  private currentModelVersionMetricsChecks$: Observable<
    ModelVersionMetricsChecks
  >;
  private comparableModelVersionMetricsChecks$: Observable<
    ModelVersionMetricsChecks[]
  >;
  private allModelVersionMetricsChecks$: Observable<
    ModelVersionMetricsChecks[]
  >;
  constructor(
    private modelsFacade: ModelsFacade,
    private facade: MonitoringPageFacade,
    private monitoring: MonitoringService
  ) {
    this.currentModelVersionMetricsChecks$ = combineLatest(
      this.modelsFacade.selectedModelVersion$,
      this.facade.checks$
    ).pipe(
      map(([modelVersion, checks]) => {
        return {
          id: modelVersion.id,
          name: modelVersion.model.name,
          version: modelVersion.modelVersion,
          metricsChecks: this.fillMetricsCheksData(checks),
        };
      })
    );

    this.comparableModelVersionMetricsChecks$ = combineLatest(
      this.facade.selectedAggregation$,
      this.comparableModelVersions.asObservable()
    ).pipe(
      switchMap(([aggregation, modelVersions]) => {
        if (modelVersions.length === 0) {
          return of([]);
        }
        return this.loadComparableChecks(aggregation, modelVersions).pipe(
          map(response => {
            return modelVersions.map(modelVersion => {
              return {
                id: modelVersion.id,
                name: modelVersion.model.name,
                version: modelVersion.modelVersion,
                metricsChecks: this.fillMetricsCheksData(
                  response[modelVersion.id]
                ),
              };
            });
          })
        );
      }),
      startWith([])
    );

    this.allModelVersionMetricsChecks$ = combineLatest(
      this.currentModelVersionMetricsChecks$,
      this.comparableModelVersionMetricsChecks$
    ).pipe(map(([current, comparable]) => [current, ...comparable]));

    this.regime$ = this.regime.asObservable();
    this.chartConfigs$ = combineLatest(
      this.regime$,
      this.allModelVersionMetricsChecks$
    ).pipe(
      map(([regime, customChecks]) => {
        const newConfigs =
          regime === 'split'
            ? this.splitChectToChartConfigs(customChecks)
            : this.mergeChecksToChartConfig(customChecks);

        return newConfigs;
      })
    );
    this.comparableModelVersions$ = this.comparableModelVersions.asObservable();
  }

  comparableModelVersionsChanged(modelVersions: ModelVersion[]): void {
    if (modelVersions.length === 0) {
      this.changeRegime('merge');
    }
    this.comparableModelVersions.next(modelVersions);
  }

  changeRegime(regime: ComparisonRegime): void {
    this.regime.next(regime);
  }

  private splitChectToChartConfigs(
    modelVersionsMetricsChecks: ModelVersionMetricsChecks[]
  ): Array<{ [metricName: string]: ChartConfig }> {
    const result = [];
    const size: ChartConfig['size'] = {
      width: 420,
      height: 240,
      margins: {
        left: 40,
        right: 20,
        top: 10,
        bottom: 24,
      },
    };
    modelVersionsMetricsChecks.forEach(({ version, metricsChecks }) => {
      const currentConfig = {};
      for (const metricName in metricsChecks) {
        if (metricsChecks.hasOwnProperty(metricName)) {
          const { data, threshold, health } = metricsChecks[metricName];
          if (currentConfig[metricName] === undefined) {
            currentConfig[metricName] = {
              size,
              data: {
                [`${metricName}:${version}`]: {
                  color: 'blue',
                  x: data.map((_, i) => i + 1),
                  y: data,
                },
              },
              name: metricName,
              plotBands: this.buildPlotBands(health),
              threshold,
            };
          }
        }
      }
      result.push(currentConfig);
    });

    return result;
  }
  private mergeChecksToChartConfig(
    modelVersionsMetricsChecks: ModelVersionMetricsChecks[]
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
    modelVersionsMetricsChecks.forEach(
      ({ id, version, name, metricsChecks }) => {
        for (const metricName in metricsChecks) {
          if (metricsChecks.hasOwnProperty(metricName)) {
            const { data, threshold, health } = metricsChecks[metricName];
            if (result[0][metricName] === undefined) {
              result[0][metricName] = {
                size,
                data: {
                  [`${metricName}:${version}`]: {
                    color: 'blue',
                    x: data.map((_, i) => i + 1),
                    y: data,
                  },
                },
                name: metricName,
                plotBands:
                  modelVersionsMetricsChecks.length === 1
                    ? this.buildPlotBands(health)
                    : [],
                threshold:
                  modelVersionsMetricsChecks.length === 1
                    ? threshold
                    : undefined,
              };
            } else {
              result[0][metricName].data[`${metricName}:${version}`] = {
                color: 'blue',
                x: data.map((_, i) => i + 1),
                y: data,
              };
            }
          }
        }
      }
    );
    return result;
  }
  private fillMetricsCheksData(
    checks: Check[]
  ): {
    [metricName: string]: {
      data: number[];
      threshold: number;
      health: boolean[];
    };
  } {
    const res: {
      [metricName: string]: {
        data: number[];
        threshold: number;
        health: boolean[];
      };
    } = {};
    checks.forEach(check => {
      const metricChecks = check._hs_metric_checks;
      for (const metricName in metricChecks) {
        if (metricChecks.hasOwnProperty(metricName)) {
          const metricCheck = check._hs_metric_checks[metricName];
          if (res[metricName] === undefined) {
            res[metricName] = {
              data: [metricCheck.value],
              threshold: metricCheck.threshold,
              health: [metricCheck.check],
            };
          } else {
            res[metricName].data.push(metricCheck.value);
            res[metricName].threshold = metricCheck.threshold;
            res[metricName].health.push(metricCheck.check);
          }
        }
      }
    });
    return res;
  }

  private loadComparableChecks(
    selectedAggregation: ChecksAggregationItem,
    modelVersions: ModelVersion[]
  ): Observable<{
    [modelVersionId: number]: Check[];
  }> {
    const request: {
      [modelVersionId: number]: Observable<Check[]>;
    } = modelVersions.reduce((req, { id }) => {
      req[id] = this.monitoring.getChecks({
        modelVersionId: id,
        from: selectedAggregation.additionalInfo._hs_first_id,
        to: selectedAggregation.additionalInfo._hs_last_id,
      });
      return req;
    }, {});
    return forkJoin(request);
  }

  private buildPlotBands(
    health: boolean[]
  ): Array<{ from: number; to: number }> {
    let currentBand: { from: number; to: number };
    const res = [];
    health.forEach((check, idx) => {
      if (!check) {
        if (currentBand) {
          currentBand.to = idx + 1;
        } else {
          currentBand = { from: idx + 1, to: idx + 1 };
        }
      } else {
        if (currentBand) {
          res.push({ ...currentBand });
          currentBand = undefined;
        }
      }
    });

    if (currentBand) {
      res.push({ ...currentBand });
    }

    return res;
  }
}
