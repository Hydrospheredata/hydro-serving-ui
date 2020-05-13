import { Check } from '@monitoring/models';

export const mockCheck: Check = new Check({
  _id: 'id',
  _hs_error: '',
  _hs_latency: 1,
  _hs_model_version_id: 2,
  _hs_overall_score: 0,
  _hs_prediction_score: 0,
  _hs_raw_checks: { overall: [] },
  _hs_metric_checks: {},
  _hs_score: 0,
  _hs_model_incremental_version: 1,
  _hs_model_name: 'model',
});
