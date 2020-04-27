import { Injectable } from '@angular/core';
import { ColorPaletteService } from '@core/services/color-palette.service';
import { ModelsFacade } from '@models/store';
import { ChartConfig, Check } from '@monitoring/interfaces';
import { Aggregation } from '@monitoring/models/Aggregation';
import { MonitoringService } from '@monitoring/services';
import { MonitoringPageFacade } from '@monitoring/store/facades';
import { MetricsFacade } from '@monitoring/store/facades/metrics.facade';
import { ModelVersion } from '@shared/_index';
import { MetricSpecification } from '@shared/models/metric-specification.model';
import { BehaviorSubject, combineLatest, forkJoin, Observable, of } from 'rxjs';
import { map, switchMap, startWith } from 'rxjs/operators';

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
  chartConfigs$: Observable<ChartConfig[]>;
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
  private selectedMetrics$: Observable<any>;

  constructor(
    private metricsFacade: MetricsFacade,
    private modelsFacade: ModelsFacade,
    private facade: MonitoringPageFacade,
    private monitoring: MonitoringService,
    private colorPalette: ColorPaletteService
  ) {
    this.selectedMetrics$ = this.metricsFacade.selectedMetrics$;
    this.metricsFacade.selectedMetrics$.subscribe(console.dir);
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
      this.facade.modelVersion$,
      this.facade.selectedAggregation$,
      this.comparableModelVersions.asObservable()
    ).pipe(
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
                  metricsChecks: this.fillMetricsCheksData(response[id]),
                };
              }
            );
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
      this.selectedMetrics$,
      this.allModelVersionMetricsChecks$
    ).pipe(
      map(([metrics, customChecks]) => {
        return this.mergeChecksToChartConfig(metrics, customChecks);
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

  private mergeChecksToChartConfig(
    metrics,
    modelVersionsMetricsChecks: ModelVersionMetricsChecks[]
  ): ChartConfig[] {
    return this.generateConfigs(metrics, modelVersionsMetricsChecks);
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
    originalModelVersion: ModelVersion,
    aggregation: Aggregation,
    comparedModelVersions: ModelVersion[]
  ): Observable<{
    [modelVersionId: number]: Check[];
  }> {
    const request: {
      [modelVersionId: number]: Observable<Check[]>;
    } = comparedModelVersions.reduce((req, { id }) => {
      req[id] = this.monitoring.getChecksForComparision({
        originalModelVersion: originalModelVersion.id,
        aggregationId: aggregation.id,
        comparedModelVersionId: id,
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
          right: 20,
          top: 10,
          bottom: 24,
        },
      },
      series: [],
    });

    const cfgs: ChartConfig[] = metrics.map(metric => {
      return createConfig(metric.name, metric.config.threshold);
    });

    checksByModelVer.forEach(({ name, metricsChecks, version }) => {
      const seriesName = `${name}_v:${version}`;
      Object.entries(metricsChecks).forEach(([metricName, metricCheck]) => {
        const existingConfig = cfgs.find(cfg => cfg.name === metricName);
        let config: ChartConfig = existingConfig;
        if (!existingConfig) {
          config = createConfig(metricName);
          cfgs.push(config);
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

    return cfgs;
  }
}
