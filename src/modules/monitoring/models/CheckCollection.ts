import { Check, MetricCheck } from '@monitoring/models/Check';
import { MetricCheckAggregation } from '@monitoring/models/MetricCheckAggregation';

export interface RequestsSummaryInfo {
  count: number;
  failed: number;
  success: number;
}

export class CheckCollection {
  private readonly checks: Check[];
  constructor(checks: Check[]) {
    this.checks = checks || [];
  }

  getChecks(): Check[] {
    return this.checks;
  }

  getLatency(): number[] {
    const getLatencyField = (check: Check) => check.latency;
    return this.checks.map(getLatencyField);
  }

  getErrorChecks(): Array<string | []> {
    const getErrorField = (check: Check) => check.error;
    return this.checks.map(getErrorField) || [];
  }

  getSummaryInformation(): RequestsSummaryInfo {
    const checks = this.checks;
    const count = checks.length;
    const success = checks.reduce((acc, check) => {
      if (check.overallScore === 1) {
        acc = acc + 1;
      }
      return acc;
    }, 0);
    return {
      count,
      success,
      failed: count - success,
    };
  }

  getTimestampRange(): { from: number; to: number } {
    if (this.isEmpty()) {
      return undefined;
    }

    return {
      from: this.getFirstElement().timestamp,
      to: this.getLastElement().timestamp,
    };
  }

  getFirstElement(): Check {
    return this.checks[0];
  }

  getLastElement(): Check {
    return this.checks[this.checks.length - 1];
  }

  isEmpty(): boolean {
    return this.checks.length === 0;
  }

  getMetricsChecks(): Map<string, MetricCheckAggregation> {
    const metricChecks = new Map<string, MetricCheckAggregation>();

    if (this.isEmpty()) return metricChecks;

    const fElem = this.getFirstElement();

    function create(
      name: string,
      metricCheck: MetricCheck
    ): MetricCheckAggregation {
      return {
        metricName: name,
        values: [metricCheck.value],
        threshold: metricCheck.threshold,
        checks: [metricCheck.check],
        modelVer: fElem.modelVersion,
        modelName: fElem.modelName,
        modelVerId: fElem.modelVersionId,
      };
    }

    function update(
      current: MetricCheckAggregation,
      add: MetricCheck
    ): MetricCheckAggregation {
      return {
        ...current,
        values: [...current.values, add.value],
        threshold: add.threshold,
        checks: [...current.checks, add.check],
      };
    }

    return this.getChecks().reduce((acc, check) => {
      const metrics = Object.entries(check.metricChecks);

      metrics.forEach(([metricName, metricCheck]) => {
        if (metricChecks.has(metricName)) {
          const currentFoo = metricChecks.get(metricName);

          metricChecks.set(metricName, update(currentFoo, metricCheck));
        } else {
          metricChecks.set(metricName, create(metricName, metricCheck));
        }
      });

      return metricChecks;
    }, metricChecks);
  }
}
