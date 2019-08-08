export interface ExplanationRequestBody {
  model: {
    name: string;
    version: number;
  };
  explained_instance: {
    uid: number;
    timestamp: number;
  };
}
