export interface ExplanationRequestBody {
  model: {
    name: string,
    version: string,
  };
  explained_instance: any;
}
