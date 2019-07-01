export class Explanation {
  coverage: number;
  explanation: string[];
  precision: number;

  constructor(props: {
    coverage?: number;
    explanation?: string;
    precision?: number;
  }) {
    this.coverage = props.coverage;
    this.explanation = props.explanation.split('AND');
    this.precision = props.precision;
  }
}
