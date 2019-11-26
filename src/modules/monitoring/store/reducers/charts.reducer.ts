import { Chart } from '@monitoring/interfaces';
import {
  LoadSonarDataSuccess,
  addCompare,
  removeCompare,
  changeFeature,
} from '@monitoring/store/actions';
import { createReducer, Action, on } from '@ngrx/store';
export interface State {
  [metricSpecId: string]: Chart;
}

const initialState: State = {};
const changeChartFeature = (chart: Chart, feature: number) => ({
  ...chart,
  feature,
});
const addCompareToChart = (chart: Chart, modelVersionId: number) => ({
  ...chart,
  comparedModelVersionId: modelVersionId,
});
const removeCompareFromChart = (chart: Chart) => ({
  ...chart,
  comparedModelVersionId: undefined,
});

const chartsReducer = createReducer(
  initialState,
  on(LoadSonarDataSuccess, (state, { sonarData }) => {
    const metricIds = Object.keys(sonarData);
    const chartsIds = Object.keys(state);

    const newIds = metricId => !chartsIds.includes(metricId);
    const toChart = (acc, metricId) => {
      acc[metricId] = { feature: 0, comparedModelVersionId: undefined };
      return acc;
    };

    const newCharts: Chart = metricIds.filter(newIds).reduce(toChart, {});

    return { ...state, ...newCharts };
  }),
  on(changeFeature, (state, { metricId, feature }) => {
    if (state[metricId]) {
      return Object.assign(
        {},
        state,
        changeChartFeature(state[metricId], feature)
      );
    } else {
      return state;
    }
  }),
  on(addCompare, (state, { metricId, comparedModelVersionId }) => ({
    ...state,
    [metricId]: addCompareToChart(state[metricId], comparedModelVersionId),
  })),
  on(removeCompare, (state, { metricId }) => {
    return {
      ...state,
      [metricId]: removeCompareFromChart(state[metricId]),
    };
  })
);

export function reducer(state: State, action: Action): State {
  return chartsReducer(state, action);
}
