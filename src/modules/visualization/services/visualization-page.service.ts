import { Injectable } from '@angular/core';
import {
  ScatterPlotPoint,
  ScatterPlotData,
} from '@charts/models/scatter-plot-data.model';
import {
  Colorizer,
  VisualizationResponse,
  ClassLabel,
  Metric,
} from '@core/models';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import { VisualizationFacade } from '../visualization.facade';
import { ColorizerBuilder } from './colorizer.builder';

export type ColorBy = 'class' | 'metric';

@Injectable({
  providedIn: 'root',
})
export class VisualizationPageService {
  colors$: Observable<string[]>;
  labels$: Observable<Pick<VisualizationResponse, 'class_labels'>>;
  labelsNames$: Observable<string[]>;
  loading$: Observable<boolean>;
  metricNames$: Observable<string[]>;
  scatterPlotData$: Observable<ScatterPlotData>;
  selectedIndex$: BehaviorSubject<number> = new BehaviorSubject(undefined);
  selectedLabel$: BehaviorSubject<string> = new BehaviorSubject(undefined);
  selectedMetric$: Observable<Metric>;
  selectedPoint$: Observable<ScatterPlotPoint>;
  showNearestPoints$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  top100$: Observable<number[]>;
  selectedMetricName$: Observable<string>;
  colorBy$: Observable<ColorBy>;

  private colorBy: BehaviorSubject<ColorBy> = new BehaviorSubject('class' as ColorBy);
  private selectedMetricName: BehaviorSubject<string> = new BehaviorSubject(
    undefined
  );

  constructor(
    private facade: VisualizationFacade,
    private colorizerBuilder: ColorizerBuilder
  ) {
    this.scatterPlotData$ = this.facade.response$.pipe(
      filter(val => val !== undefined),
      map(({ data }) => {
        return data.reduce(
          ({ points, minX, maxX, minY, maxY }, [x, y]) => {
            const point: ScatterPlotPoint = { x, y };
            const newPoints = [...points, point];

            return {
              points: newPoints,
              minX: x < minX ? x : minX,
              maxX: x > maxX ? x : maxX,
              minY: y < minY ? y : minY,
              maxY: y > maxY ? y : maxY,
            };
          },
          {
            points: [],
            minX: 0,
            maxX: 0,
            minY: 0,
            maxY: 0,
          }
        );
      })
    );

    this.colorBy$ = this.colorBy.asObservable();

    this.colors$ = this.colorBy$.pipe(
      switchMap(colorBy => {
        switch (colorBy) {
          case 'class':
            return this.colorsByClassLabel$();
          case 'metric':
            return this.colorsByMetric$();
          default:
            break;
        }
        return this.colorsByClassLabel$();
      })
    );

    this.selectedPoint$ = combineLatest(
      this.scatterPlotData$,
      this.selectedIndex$
    ).pipe(
      map(([data, index]) => {
        return data.points[index];
      })
    );

    this.top100$ = combineLatest(
      this.facade.response$,
      this.selectedIndex$
    ).pipe(map(([data, selectedIndex]) => data.top_100[selectedIndex]));

    this.labelsNames$ = this.facade.labelsNames$;
    this.metricNames$ = this.facade.metricsNames$;

    this.loading$ = this.facade.loading$;
    this.selectedMetric$ = combineLatest(
      this.facade.metrics$,
      this.selectedMetricName.asObservable()
    ).pipe(map(([metrics, selectedMetricName]) => metrics[selectedMetricName]));
    this.selectedMetricName$ = this.selectedMetricName.asObservable();
  }

  changeColorBy(colorBy: ColorBy): void {
    this.colorBy.next(colorBy);
  }

  selectLabel(label: string): void {
    this.selectedLabel$.next(label);
  }
  selectMetricName(metricName: string): void {
    this.selectedMetricName.next(metricName);
  }
  selectIndex(index: number): void {
    this.selectedIndex$.next(index);
  }

  private colorsByClassLabel$(): Observable<string[]> {
    return combineLatest(this.facade.labels$, this.selectedLabel$).pipe(
      map(([labels, selectedLabel]) => {
        const classLabel: ClassLabel = labels[selectedLabel];
        if (classLabel === undefined) {
          return [];
        }

        const colorizer: Colorizer = this.colorizerBuilder.build(classLabel);
        console.log(colorizer.getColors());
        return colorizer.getColors();
      })
    );
  }
  private colorsByMetric$(): Observable<string[]> {
    return this.selectedMetric$.pipe(
      map(metric => {
        if (metric === undefined) {
          return [];
        }
        const colors = this.colorizerBuilder
          .buildMetricColorizer(metric)
          .getColors();
        console.dir(colors);
        return colors;
      })
    );
  }
}
