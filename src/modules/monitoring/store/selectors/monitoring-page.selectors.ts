import { SonarData } from '@monitoring/interfaces';
import { createSelector } from '@ngrx/store';
import { SonarMetricData } from '@shared/_index';
import * as _ from 'lodash';
import * as fromFeature from '../reducers';

export const getMetrics = createSelector(
  fromFeature.getMonitoringPageState,
  state => state.metricSpecifications
);
export const selectFullAggregation = createSelector(
  fromFeature.getMonitoringPageState,
  state => state.fullAggregation
);
export const selectDetailedAggregation = createSelector(
  fromFeature.getMonitoringPageState,
  state => state.detailedAggregation
);
export const selectTimeInterval = createSelector(
  fromFeature.getMonitoringPageState,
  state => state.timeInterval
);
export const selectDetailedTimeInterval = createSelector(
  fromFeature.getMonitoringPageState,
  state => state.detailedTimeInterval
);
export const selectTimeBound = createSelector(
  fromFeature.getMonitoringPageState,
  state => state.timeBound
);

export const selectReqstoreData = createSelector(
  fromFeature.getMonitoringPageState,
  state => state.reqstoreData
);

export const selectIsLive = createSelector(
  fromFeature.getMonitoringPageState,
  state => state.live
);

export const selectSonarData = createSelector(
  fromFeature.getMonitoringPageState,
  state => state.sonarData
);
export const selectComparedSonarData = createSelector(
  fromFeature.getMonitoringPageState,
  state => state.comparedSonarData
);

export const selectComparedMetricSpecifications = createSelector(
  fromFeature.getMonitoringPageState,
  state => state.comparedMetricSpecifications
);

export const selectSonarDataInDetailedInterval = createSelector(
  selectSonarData,
  selectDetailedTimeInterval,
  (sonarData, interval) => {
    if (interval) {
      const { from, to } = interval;
      const detailedSonarData: SonarData = {};
      for (const metricSpecId in sonarData) {
        if (sonarData.hasOwnProperty(metricSpecId)) {
          detailedSonarData[metricSpecId] = _.filter(
            sonarData[metricSpecId],
            i => i.timestamp >= from && i.timestamp <= to
          );
        }
      }
      return detailedSonarData;
    } else {
      return sonarData;
    }
  }
);

export const selectDetailedCharts = createSelector(
  fromFeature.getMonitoringPageState,
  state => state.detailedCharts
);

export const selectDetailedChartsWithData = createSelector(
  selectDetailedCharts,
  selectSonarDataInDetailedInterval,
  getMetrics,
  selectComparedMetricSpecifications,
  selectComparedSonarData,
  (charts, sonarData, metrics, cMetricSpecs, cSonarData) => {
    try {
      const metricSpecidicationsIds = _.keys(charts);
      const res = metricSpecidicationsIds.map(metricSpecId => {
        const metricSpecification = metrics.find(ms => ms.id === metricSpecId);
        let newSonarData: SonarMetricData[];

        let comparedSonarData: SonarMetricData[] = [];
        if (charts[metricSpecId].feature !== undefined) {
          newSonarData = sonarData[metricSpecId].filter(
            item => item.labels.columnIndex === charts[metricSpecId].feature
          );
        } else {
          newSonarData = sonarData[metricSpecId];
        }

        const comparableModelVersionId =
          charts[metricSpecId].comparedModelVersionId;
        if (
          comparableModelVersionId !== undefined &&
          cMetricSpecs[comparableModelVersionId]
        ) {
          const comparedMetric = cMetricSpecs[comparableModelVersionId].find(
            m => m.kind === metricSpecification.kind
          );
          if (comparedMetric) {
            comparedSonarData = cSonarData[comparedMetric.id];
          }
        }

        return {
          ...charts[metricSpecId],
          sonarData: newSonarData,
          metricSpecId,
          comparedSonarData,
          metricSpecification,
        };
      });

      return res;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
);

export const selectRequestResponseLog = createSelector(
  getMetrics,
  selectSonarDataInDetailedInterval,
  selectReqstoreData,
  (metrics, sonarData, reqstoreData) => {
    console.log('select reqstore');
    const reqstoreEntries = _.entries(reqstoreData);
    const sonarEntries = _.entries(sonarData);
    const mapped = reqstoreEntries.reduce((res, [uid, reqstorEntry]) => {
      // TODO: what if many entries?
      res[reqstorEntry[0].ts] = reqstorEntry[0];
      return res;
    }, {});

    if (_.isEmpty(sonarData) || _.isEmpty(reqstoreData)) {
      return {};
    }

    const log = {};
    for (let i = 0; i < sonarEntries.length; i++) {
      const [merticSpecId, currentSonarData] = sonarEntries[i];

      for (let j = 0; j < currentSonarData.length; j++) {
        const traces = currentSonarData[j].labels.traces;
        if (_.isEmpty(traces)) {
          continue;
        }

        traces.forEach(trace => {
          if (trace) {
            const { uid } = trace;
            if (reqstoreData[uid] !== undefined) {
              if (log[uid] === undefined) {
                log[uid] = reqstoreData[uid][0];
                log[uid].failed = false;
                log[uid].metrics = {};
              }
              const metricKind = metrics.find(m => m.id === merticSpecId).kind;
              if (log[uid].metrics[metricKind] === undefined) {
                log[uid].metrics[metricKind] = {};
              }

              const metricsByKind = log[uid].metrics[metricKind];
              const columnIndex = +currentSonarData[j].labels.columnIndex || 0;
              metricsByKind[columnIndex] = metricsByKind[columnIndex] || {};

              if (
                metricsByKind[columnIndex][currentSonarData[j].name] ===
                undefined
              ) {
                metricsByKind[columnIndex][currentSonarData[j].name] =
                  currentSonarData[j];
              }

              if (currentSonarData[j].health === false) {
                log[uid].failed = true;
              }
            }
          }
        });
      }
    }

    return log;
  }
);
