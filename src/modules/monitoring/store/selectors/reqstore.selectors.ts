import { createSelector } from '@ngrx/store';
import { SonarMetricData } from '@shared/_index';
import { isEmpty, entries } from 'lodash';
import * as fromFeature from '../reducers';

export const selectReqstoreLog = createSelector(
  fromFeature.getReqstoreState,
  fromFeature.getSonarState,
  fromFeature.getMetricsState,
  (reqstore, sonar, metrics) => {
    if (isEmpty(reqstore) || isEmpty(sonar)) {
      return {};
    }

    const tracesNotEmpty = (data: SonarMetricData) => {
      const tr = data.labels.traces.filter(
        trace => trace !== null && reqstore[trace.uid] !== undefined
      );

      return !isEmpty(tr);
    };
    const sonarDataWithTraces = ([metricId, data]) => [
      metricId,
      data.filter(tracesNotEmpty),
    ];

    const toLog = (acc, sonarEntry) => {
      const [metricId, sonarData]: [string, SonarMetricData[]] = sonarEntry;

      sonarData.forEach(data => {
        const {
          labels: { traces },
        } = data;

        traces.forEach(trace => {
          const { uid } = trace;
          if (reqstore[uid] !== undefined) {
            if (acc[uid] === undefined) {
              acc[uid] = reqstore[uid][0];
              acc[uid].failed = false;
              acc[uid].metrics = {};
            }
            const metricKind = metrics.entities[metricId].kind;
            if (acc[uid].metrics[metricKind] === undefined) {
              acc[uid].metrics[metricKind] = {};
            }

            const metricsByKind = acc[uid].metrics[metricKind];
            const columnIndex = data.labels.columnIndex || 0;
            metricsByKind[columnIndex] = metricsByKind[columnIndex] || {};

            if (metricsByKind[columnIndex][data.name] === undefined) {
              metricsByKind[columnIndex][data.name] = data;
            }

            if (data.health === false) {
              acc[uid].failed = true;
            }
          }
        });
      });
      return acc;
    };

    return entries(sonar)
      .map(sonarDataWithTraces)
      .reduce(toLog, {});
  }
);
