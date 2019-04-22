
import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http';
import { environment } from '@environments/environment';
import { IMetricSpecification, IMetricSpecificationProvider } from '@shared/models/metric-specification.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface IMetricData {
  name: string;
  value: number;
  labels: {
      modelVersionId: string;
      trace?: any;
      traces?: any;
  };
  timestamp: number;
  health: any;
}

export interface IMonitoringAggregationItem {
  meanValue: number | null;
  meanHealth: number | null;
  from: number;
  till: number;
  modelVersionId: number;
  minValue: null;
  maxValue: null;
}

@Injectable()
export class MonitoringService {

  private baseMonitoringUrl: string;

  constructor(
    private http: HttpService
  ) {
    this.baseMonitoringUrl = `${environment.monitoringUrl}`;
  }

  public getMetrics(
    modelVersionId: string,
    interval: string,
    metrics: string[],
    columnIndex?: string
    ): Promise<IMetricData[]> {
      return this.http.get(
          `${this.baseMonitoringUrl}/metrics`,
          { params: {
              modelVersionId,
              interval,
              metrics,
              columnIndex,
            },
          }
        ).pipe(
          map((res: Response): any => res)
        ).toPromise();
  }

  // TODO: do not work
  public getHealth() {
    return this.http.get(`${this.baseMonitoringUrl}/health`).pipe(
      map((res: Response): any => res)
    ).toPromise();
  }

  public getAggregation(
    modelVersionId: string,
    metrics: string[],
    optional: {
      from?: string;
      till?: string;
      steps?: string;
    } = {}
  ): Observable<IMonitoringAggregationItem[]> {
    return this.http.get(`${this.baseMonitoringUrl}/metrics/aggregation`, {
      params: {
        modelVersionId,
        metrics,
        ...optional,
      },
    });
  }

  public getMetricsInRange(
    modelVersionId: string,
    metrics: string[],
    optional: {
      from?: string;
      till?: string;
      columnIndex?: string;
    } = {}
  ): Observable<IMonitoringAggregationItem[]> {
    return this.http.get(`${this.baseMonitoringUrl}/metrics/range`, {
      params: {
        modelVersionId,
        metrics,
        ...optional,
      },
    });
  }

  public createMetricProviders(metricSpecification: IMetricSpecification): IMetricSpecificationProvider  {
    const dict = {
        CounterMetricSpec:      ['counter'],
        KSMetricSpec:           ['kolmogorovsmirnov', 'kolmogorovsmirnov_level'],
        AEMetricSpec:           ['autoencoder_reconstructed'],
        ImageAEMetricSpec:      ['image_autoencoder_reconstructed'],
        RFMetricSpec:           ['randomforest'],
        GANMetricSpec:          ['gan_outlier', 'gan_inlier'],
        LatencyMetricSpec:      ['latency'],
        ErrorRateMetricSpec:    ['error_rate'],
    };

    return {
        kind: metricSpecification.kind,
        byModelVersionId: { [metricSpecification.modelVersionId]: metricSpecification },
        metrics: dict[metricSpecification.kind],
    };
  }

  public getMetricsBySpecKind(spec: string): string[] {
    const dict = {
      CounterMetricSpec:      ['counter'],
      KSMetricSpec:           ['kolmogorovsmirnov', 'kolmogorovsmirnov_level'],
      AEMetricSpec:           ['autoencoder_reconstructed'],
      ImageAEMetricSpec:      ['image_autoencoder_reconstructed'],
      RFMetricSpec:           ['randomforest'],
      GANMetricSpec:          ['gan_outlier', 'gan_inlier'],
      LatencyMetricSpec:      ['latency'],
      ErrorRateMetricSpec:    ['error_rate'],
    };

    return dict[spec];
  }
}
