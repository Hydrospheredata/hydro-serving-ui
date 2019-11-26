import { ChartViewModel } from '@monitoring/interfaces';
import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';

export const selectCharts = createSelector(
  fromFeature.getChartsState,
  fromFeature.getSonarState,
  fromFeature.getMetricsState,
  (charts, sonar, metrics) => {
    const metricIds = Object.keys(charts);
    const toChartViewModel: (metricId: string) => ChartViewModel = metricId => {
      if (charts[metricId] === undefined) {
        return;
      }

      const { feature, comparedModelVersionId } = charts[metricId];
      return {
        feature,
        comparedModelVersionId,
        data: sonar[metricId],
        comparedData: [],
        metricSpecId: metricId,
        metricSpecification: metrics.entities[metricId],
      };
    };

    return metricIds.map(toChartViewModel);
  }
);
