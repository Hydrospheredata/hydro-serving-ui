import { Injectable } from '@angular/core';
import { Labels, LabelTypes, Colorizer } from '@core/models';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { VisualizationFacade } from '../visualization.facade';
import { ColorizerBuilder } from './colorizer.builder';

@Injectable()
export class VisualizationService {
  selectedLabel$: BehaviorSubject<LabelTypes> = new BehaviorSubject(undefined);
  selectedIndex$: BehaviorSubject<number> = new BehaviorSubject(undefined);
  labels$: Observable<Labels>;
  colors$: Observable<string[]>;
  selectedPoint$: Observable<ScatterPlotPoint>;
  showNearestPoints$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  top100$: Observable<number[]>;
  scatterPlotData$: Observable<ScatterPlotData>;
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
    this.labels$ = this.facade.visualizationLabels$;
    this.colors$ = combineLatest(this.labels$, this.selectedLabel$).pipe(
      map(([labels, selectedLabel]) => {
        if (labels[selectedLabel] === undefined) {
          return [];
        }

        let colorizer: Colorizer;
        if (labels[selectedLabel]) {
          colorizer = this.colorizerBuilder.build(selectedLabel);
        } else {
          colorizer = this.colorizerBuilder.build();
        }

        return labels[selectedLabel].map(val => colorizer.color(val));
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
  }

  selectLabel(label: LabelTypes): void {
    this.selectedLabel$.next(label);
  }
  selectIndex(index: number): void {
    this.selectedIndex$.next(index);
  }
}
