import { Check } from '@monitoring/models/Check';

export class CheckCollection {
  private checks: Check[];
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

  getSummaryInformation(): {
    count: number;
    failed: number;
    success: number;
  } {
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

  getFirstElement(): Check {
    return this.checks[0];
  }

  isEmpty(): boolean {
    return this.checks.length === 0;
  }
}
