import { Injectable } from '@angular/core';
import { ColorPaletteService } from '@core/services/color-palette.service';
import { ChartConfig, Aggregation } from '@monitoring/models';
import { Check, CheckCollection } from '@monitoring/models';
import { MonitoringService } from '@monitoring/services';
import { MonitoringPageFacade } from '@monitoring/store/facades';
import { MetricsFacade } from '@monitoring/store/facades/metrics.facade';
import { MetricChartsState } from '@monitoring/store/metric-charts.state';
import { ModelVersion } from '@shared/_index';
import { MetricSpecification } from '@shared/models/metric-specification.model';
import { neitherNullNorUndefined } from '@shared/utils';
import { combineLatest, forkJoin, Observable, of } from 'rxjs';
import { map, switchMap, startWith, tap, shareReplay } from 'rxjs/operators';

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

  private readonly chartConfigs$: Observable<ChartConfig[]>;
  private currentModelVersionMetricsChecks$: Observable<
    ModelVersionMetricsChecks
  >;
  private comparableModelVersionMetricsChecks$: Observable<
    ModelVersionMetricsChecks[]
  >;
  private allModelVersionMetricsChecks$: Observable<
    ModelVersionMetricsChecks[]
  >;
  private selectedMetrics$: Observable<any>;

  constructor(
    private metricsFacade: MetricsFacade,
    private monitoringPageFacade: MonitoringPageFacade,
    private monitoringApi: MonitoringService,
    private colorPalette: ColorPaletteService,
    private state: MetricChartsState
  ) {
    this.selectedMetrics$ = this.metricsFacade.selectedMetrics$;

    this.currentModelVersionMetricsChecks$ = combineLatest([
      this.monitoringPageFacade.getModelVersion(),
      this.monitoringPageFacade.getChecks().pipe(neitherNullNorUndefined),
    ]).pipe(
      map(([modelVersion, checks]) => {
        return {
          id: modelVersion.id,
          name: modelVersion.model.name,
          version: modelVersion.modelVersion,
          metricsChecks: this.fillMetricsChecksData(checks),
        };
      }),
      shareReplay(1)
    );

    this.comparableModelVersionMetricsChecks$ = combineLatest([
      this.monitoringPageFacade.getModelVersion(),
      this.monitoringPageFacade.getAggregation().pipe(neitherNullNorUndefined),
      this.state.getModelVersionsToCompare(),
    ]).pipe(
      switchMap(([currentModelVersion, aggregation, modelVersions]) => {
        if (modelVersions.length === 0) {
          return of([]);
        }
        return this.loadComparableChecks(
          currentModelVersion,
          aggregation,
          modelVersions
        ).pipe(
          map(response => {
            return modelVersions.map(
              ({ id, model: { name }, modelVersion }) => {
                return {
                  id,
                  name,
                  version: modelVersion,
                  metricsChecks: this.fillMetricsChecksData(response[id]),
                };
              }
            );
          })
        );
      }),
      startWith([]),
      shareReplay(1)
    );

    this.allModelVersionMetricsChecks$ = combineLatest([
      this.currentModelVersionMetricsChecks$,
      this.comparableModelVersionMetricsChecks$,
    ]).pipe(map(([current, comparable]) => [current, ...comparable]));

    this.chartConfigs$ = combineLatest([
      this.selectedMetrics$,
      this.allModelVersionMetricsChecks$,
    ]).pipe(
      tap(_ => console.log('chartConfigs$')),
      map(([metrics, checks]) => {
        return this.mergeChecksToChartConfig(metrics, checks);
      }),
      shareReplay(1)
    );
  }

  getChartConfigs(): Observable<ChartConfig[]> {
    return this.chartConfigs$;
  }

  comparableModelVersionsChanged(modelVersions: ModelVersion[]): void {
    this.state.addModelVersionToCompare(modelVersions);
  }

  getModelVersionsToCompare(): Observable<ModelVersion[]> {
    return this.state.getModelVersionsToCompare();
  }

  private mergeChecksToChartConfig(
    metrics,
    modelVersionsMetricsChecks: ModelVersionMetricsChecks[]
  ): ChartConfig[] {
    return this.generateConfigs(metrics, modelVersionsMetricsChecks);
  }

  private fillMetricsChecksData(
    checks: CheckCollection
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

    if (checks === null) {
      return {};
    }

    checks.getChecks().forEach(check => {
      const metricChecks = check.metricChecks;
      for (const metricName in metricChecks) {
        if (metricChecks.hasOwnProperty(metricName)) {
          const metricCheck = check.metricChecks[metricName];
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
    originalModelVersion: ModelVersion,
    aggregation: Aggregation,
    comparedModelVersions: ModelVersion[]
  ): Observable<{
    [modelVersionId: number]: CheckCollection;
  }> {
    const request: {
      [modelVersionId: number]: Observable<CheckCollection>;
    } = comparedModelVersions.reduce((req, { id }) => {
      req[id] = this.monitoringApi
        .getChecksForComparision({
          originalModelVersion: originalModelVersion.id,
          aggregationId: aggregation.id,
          comparedModelVersionId: id,
        })
        .pipe(
          map(bareChecks => {
            const checks = bareChecks.map(bareCheck => new Check(bareCheck));
            return new CheckCollection(checks);
          })
        );
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

  private generateConfigs(
    metrics: MetricSpecification[],
    checksByModelVer: ModelVersionMetricsChecks[]
  ): ChartConfig[] {
    const palette = this.colorPalette.getPalette();
    const createConfig = (name, threshold?) => ({
      name,
      threshold,
      size: {
        margins: {
          left: 40,
          right: 12,
          top: 2,
          bottom: 16,
        },
      },
      series: [],
    });

    const configs: ChartConfig[] = metrics.map(metric => {
      return createConfig(metric.name, metric.config.threshold);
    });

    checksByModelVer.forEach(({ name, metricsChecks, version }) => {
      const seriesName = `${name}_v:${version}`;
      Object.entries(metricsChecks).forEach(([metricName, metricCheck]) => {
        const existingConfig = configs.find(cfg => cfg.name === metricName);
        let config: ChartConfig = existingConfig;
        if (!existingConfig) {
          config = createConfig(metricName);
          configs.push(config);
        }
        config.series.push({
          name: seriesName,
          data: metricCheck.data,
          color: palette[config.series.length],
        });

        if (config.threshold === undefined && config.series.length === 1) {
          config.threshold = metricCheck.threshold;
        }
        if (config.plotBands === undefined && config.series.length === 1) {
          config.plotBands = this.buildPlotBands(metricCheck.health);
        }
        if (config.series.length > 1) {
          config.threshold = undefined;
          config.plotBands = undefined;
        }
      });
    });

    return configs;
  }
}
