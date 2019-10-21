export interface ApplicationCreatingRequest {
  name: string;
  kafkaStreaming: any[];
  executionGraph: {
    stages: Array<{
      modelVariants: Array<{
        modelVersionId: number;
        weight: number;
      }>
    }>
  };
}
