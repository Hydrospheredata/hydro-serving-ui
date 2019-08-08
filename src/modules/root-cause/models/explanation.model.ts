export class Explanation {
  completedAt: string;
  createdAt: string;
  startedAt: string;
  explainedInstance: {
    timestamp: number;
    uid: number;
  };
  model: {
    name: string;
    version: number;
  };
  result: any;

  constructor(props) {
    this.completedAt = props.completedAt;
    this.createdAt = props.createdAt;
    this.startedAt = props.startedAt;
    this.explainedInstance = props.explainedInstance;
    this.model = props.model;
    this.result = props.result;
  }
}
