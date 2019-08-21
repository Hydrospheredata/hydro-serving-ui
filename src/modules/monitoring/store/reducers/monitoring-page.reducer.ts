import { Aggregation, SonarData, Charts } from '@monitoring/interfaces';
import {
  LoadMetricsSuccess,
  LoadMetricsFailed,
  LoadFullAggregationSuccess,
  SetTimeInterval,
  LoadReqstoreDataSuccess,
  LoadSonarDataSuccess,
  LoadDetailedAggregationSuccess,
  StopAutoUpdate,
  StartAutoUpdate,
  SetDetailedTimeInterval,
  addComparedModelVersionId,
  ComparedMetricsLoadSuccess,
  LoadComparedSonarDataSuccess,
  ClearPage,
  SetTimeBound,
} from '@monitoring/store/actions';
import { createReducer, Action, on } from '@ngrx/store';
import { TimeInterval } from '@shared/_index';
import { MetricSpecification } from '@shared/models/metric-specification.model';
import { ReqstoreLog } from '@shared/models/reqstore.model';
import * as _ from 'lodash';

export interface State {
  metricSpecifications: MetricSpecification[];
  comparedMetricSpecifications: {
    [modelVersionId: string]: MetricSpecification[];
  };
  comparedMetricMap: { [metricSpecKind: string]: number };
  error: string;
  timeInterval: TimeInterval;
  detailedTimeInterval: TimeInterval;
  timeBound: number;
  fullAggregation: Aggregation;
  detailedAggregation: Aggregation;
  reqstoreData: ReqstoreLog;
  sonarData: SonarData;
  comparedSonarData: SonarData;
  detailedCharts: Charts;
  live: boolean;
}

const initialState: State = {
  error: undefined,
  metricSpecifications: [],
  comparedMetricSpecifications: {},
  comparedMetricMap: {},
  timeInterval: undefined,
  detailedTimeInterval: undefined,
  timeBound: 0,
  fullAggregation: undefined,
  detailedAggregation: undefined,
  reqstoreData: undefined,
  sonarData: {},
  comparedSonarData: {},
  detailedCharts: {},
  live: true,
};
const monitoringPageStateReducer = createReducer(
  initialState,
  on(ClearPage, () => initialState),
  on(LoadMetricsSuccess, (state, { metricSettings }) => ({
    ...state,
    metricSpecifications: metricSettings,
  })),
  on(LoadMetricsFailed, (state, { error }) => ({
    ...state,
    error,
  })),
  on(LoadFullAggregationSuccess, (state, { fullAggregation }) => ({
    ...state,
    fullAggregation,
  })),
  on(LoadDetailedAggregationSuccess, (state, { detailedAggregation }) => ({
    ...state,
    detailedAggregation,
  })),
  on(SetTimeInterval, (state, { timeInterval }) => ({
    ...state,
    timeInterval,
  })),
  on(SetDetailedTimeInterval, (state, { timeInterval }) => ({
    ...state,
    detailedTimeInterval: timeInterval,
  })),
  on(LoadReqstoreDataSuccess, (state, { reqstoreData }) => ({
    ...state,
    reqstoreData,
  })),
  on(LoadSonarDataSuccess, (state, action) => {
    const previousDatailedCharts = state.detailedCharts;
    const newSonarData = action.sonarData;

    if (_.isEmpty(newSonarData)) {
      return state;
    } else {
      const newSonarDataEntries = Object.entries(newSonarData);
      const sonarData = newSonarDataEntries.reduce(
        (acc, [metricSpecId, data]) => {
          // ? optimization
          // if (acc[metricSpecId] === undefined) {
          acc[metricSpecId] = data;
          // } else {
          //   acc[metricSpecId] = [...acc[metricSpecId], ...data.slice(1)];
          // }

          return acc;
        },
        {}
      );

      const detailedCharts = newSonarDataEntries.reduce(
        (acc, [metricSpecId]) => {
          const previousDetailedChart = previousDatailedCharts[metricSpecId];

          const metricSpecification: MetricSpecification = state.metricSpecifications.find(
            metricSpec => metricSpec.id === metricSpecId
          );

          if (previousDetailedChart) {
            acc[metricSpecId] = previousDetailedChart;
          } else {
            // TODO:  move dat logic to class
            if (metricSpecification.kind === 'KSMetricSpec') {
              acc[metricSpecId] = { feature: 0 };
            } else {
              acc[metricSpecId] = {};
            }
          }

          return acc;
        },
        {}
      );

      return { ...state, sonarData, detailedCharts };
    }
  }),
  on(StopAutoUpdate, state => ({ ...state, live: false })),
  on(StartAutoUpdate, state => ({ ...state, live: true })),
  on(addComparedModelVersionId, (state, action) => {
    const newCharts = {
      ...state.detailedCharts,
      [action.metricSpecId]: {
        ...state.detailedCharts[action.metricSpecId],
        comparedModelVersionId: action.modelVersionId,
      },
    };

    return {
      ...state,
      detailedCharts: newCharts,
    };
  }),
  on(ComparedMetricsLoadSuccess, (state, action) => {
    const old = state.comparedMetricSpecifications[action.modelVersionId] || [];
    const newComparedSpecs = {
      ...state.comparedMetricSpecifications,
      [action.modelVersionId]: [...old, ...action.metrics],
    };
    return { ...state, comparedMetricSpecifications: newComparedSpecs };
  }),
  // TODO add removing comparison
  on(LoadComparedSonarDataSuccess, (state, { comparedSonarData }) => ({
    ...state,
    comparedSonarData,
  })),
  on(SetTimeBound, (state, {timeBound}) => ({...state, timeBound}))
);

export function reducer(state: State, action: Action): State {
  return monitoringPageStateReducer(state, action);
}
