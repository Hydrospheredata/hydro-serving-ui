export interface GetChecksAggreagationParams {
  modelVersionId: number;
  limit?: number;
  offset?: number;
}

export interface AdditionalCheckInfo {
  _hs_first_id: string;
  _hs_last_id: string;
  _hs_model_version_id: number;
  _hs_requests: number;
  _id: string;
}

export interface Feautures {
  [featureName: string]: { checks: number; passed: number };
}

export type ChecksAggregationResponse = Feautures & AdditionalCheckInfo;
export interface ChecksAggregation {
  features: Feautures;
  additionalInfo: Partial<AdditionalCheckInfo>;
}
