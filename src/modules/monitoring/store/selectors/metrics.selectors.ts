import * as fromModels from '@models/store/selectors';
import { createSelector } from '@ngrx/store';
import { getMetricsState } from '../reducers';
import * as fromMetrics from '../reducers/metrics.reducer';

export const selectAllMetrics = createSelector(
  getMetricsState,
  fromMetrics.selectAllMetrics
);
export const selectAllMetricsEntities = createSelector(
  getMetricsState,
  fromMetrics.selectAllMetricsEntities
);
export const selectAllMetricsIds = createSelector(
  getMetricsState,
  fromMetrics.selectAllMetricsIds
);
export const selectSelectedMetrics = createSelector(
  selectAllMetrics,
  fromModels.selectSelectedModelVersion,
  (metrics, modelVersion) =>
    modelVersion &&
    metrics.filter(metric => metric.modelVersionId === modelVersion.id)
);

export const selectMetricSpecsNames = createSelector(
  selectAllMetrics,
  metrics => metrics.map(({name}) => name || 'n/a')
);
