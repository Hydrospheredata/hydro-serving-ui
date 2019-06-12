import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HydroServingState, getSelectedMetrics } from '@core/reducers';
import { MetricSettingsService } from '@core/services/metrics/_index';
import { getSiblingVersions } from '@models/reducers';
import { Store } from '@ngrx/store';
import { ModelVersion } from '@shared/_index';
import { MetricSpecification } from '@shared/models/metric-specification.model';
import * as _ from 'lodash';
import { Observable, Subject, combineLatest, of } from 'rxjs';
import {
  switchMap,
  map,
  filter,
} from 'rxjs/operators';

@Component({
  selector: 'hs-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraphsComponent implements OnInit {
  siblingModelVersions$: Observable<ModelVersion[]>;

  selectedMetricSpecifications$: Observable<MetricSpecification[]>;
  comparedModelVersion$: Subject<any> = new Subject();
  comparedMetricSpecifications$: Observable<MetricSpecification[]>;

  groupedMetricSpecifications$: Observable<_.Dictionary<MetricSpecification[]>>;

  chartTimeWidth: number = 1800000;
  chartTimeWidthParams: Array<{ ms: number, text: string }> = [
      { ms: 900000, text: '15 minutes' },
      { ms: 1800000, text: '30 minutes' },
      { ms: 3600000, text: '1 hour' },
      { ms: 7200000, text: '2 hours' },
      { ms: 14400000, text: '4 hours' },
  ];

  set compareModelVersionId(id) {
    this.comparedModelVersion$.next(id);
  }

  liveUpdate: boolean = true;
  constructor(
    private store: Store<HydroServingState>,
    private metricSettingService: MetricSettingsService
  ) {
    this.selectedMetricSpecifications$ = this.store.select(getSelectedMetrics);
    this.siblingModelVersions$ = this.store.select(getSiblingVersions);
    this.comparedMetricSpecifications$ = this.comparedModelVersion$.pipe(
      switchMap(id => {
        if (id) {
          return this.metricSettingService.getMetricSettings(id);
        } else {
          return of([]);
        }
      })
    );
  }

  ngOnInit() {
    this.groupedMetricSpecifications$ = combineLatest(
      this.selectedMetricSpecifications$,
      this.comparedMetricSpecifications$
    ).pipe(
      filter(([selectedMetricSpecs]) => !!selectedMetricSpecs),
      map(arrays => {
        console.dir(arrays);
        const flattenArray = _.flatten(arrays);
        return _.groupBy(flattenArray, d => d.kind);
      })
    );
  }
}
