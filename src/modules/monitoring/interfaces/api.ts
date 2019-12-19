export interface GetChecksParams {
  modelVersionId: number;
  from: string;
  to: string;
}
export interface GetChecksAggregationParams {
  modelVersionId: number;
  limit?: number;
  offset?: number;
}
