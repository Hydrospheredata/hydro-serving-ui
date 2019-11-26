import { ComparingChartParams } from '@monitoring/interfaces';
import { createAction, props } from '@ngrx/store';

export const changeFeature = createAction(
  '[Chart] change feature',
  props<{ metricId: number; feature: number }>()
);
export const addCompare = createAction(
  '[Chart] add compare',
  props<ComparingChartParams>()
);
export const removeCompare = createAction(
  '[Chart] remove compare',
  props<{ metricId: string }>()
);
