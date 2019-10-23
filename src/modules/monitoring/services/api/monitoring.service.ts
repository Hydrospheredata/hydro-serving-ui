import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http';
import { environment } from '@environments/environment';
import {
  GetChecksAggreagationParams,
  GetChecksParams,
  ChecksAggregation,
  ChecksAggregationResponse,
} from '@monitoring/interfaces';
import {
  MetricSpecification,
  IMetricSpecificationProvider,
} from '@shared/models/metric-specification.model';
import { Observable } from 'rxjs';

@Injectable()
export class MonitoringService {
  private baseUrl: string;

  constructor(private http: HttpService) {
    this.baseUrl = `${environment.monitoringUrl}`;
  }

  public getMonitoringServiceStatus() {
    return this.http.get(`${this.baseUrl}/buildinfo`);
  }

  public getMetricsBySpecKind(spec: string): string[] {
    const dict = {
      CounterMetricSpec: ['counter'],
      KSMetricSpec: ['kolmogorovsmirnov', 'kolmogorovsmirnov_level'],
      AEMetricSpec: ['autoencoder_reconstructed'],
      ImageAEMetricSpec: ['image_autoencoder_reconstructed'],
      RFMetricSpec: ['randomforest'],
      GANMetricSpec: ['gan_outlier', 'gan_inlier'],
      LatencyMetricSpec: ['latency'],
      ErrorRateMetricSpec: ['error_rate'],
      AccuracyMetricSpec: ['accuracy'],
      CustomModelMetricSpec: ['custom_model_value'],
    };

    return dict[spec];
  }

  // ! TODO move that from api service;
  public getSpecKindByMetricName(metricName: string) {
    const dict = {
      counter: 'CounterMetricSpec',
      kolmogorovsmirnov: 'KSMetricSpec',
      kolmogorovsmirnov_level: 'KSMetricSpec',
      autoencoder_reconstructed: 'AEMetricSpec',
      image_autoencoder_reconstructed: 'ImageAEMetricSpec',
      randomforest: 'RFMetricSpec',
      gan_outlier: 'GANMetricSpec',
      gan_inlier: 'GANMetricSpec',
      latency: 'LatencyMetricSpec',
      error_rate: 'ErrorRateMetricSpec',
      accuracy: 'AccuracyMetricSpec',
    };

    return dict[metricName];
  }

  public createMetricProviders(
    metricSpecification: MetricSpecification
  ): IMetricSpecificationProvider {
    return {
      kind: metricSpecification.kind,
      byModelVersionId: {
        [metricSpecification.modelVersionId]: metricSpecification,
      },
      metrics: this.getMetricsBySpecKind(metricSpecification.kind),
    };
  }

  getChecks({ modelVersionId, from, to }: GetChecksParams): Observable<any> {
    return this.http.get(`${this.baseUrl}/checks/${modelVersionId}`, {
      params: { from, to },
    });
  }

  getChecksAggregation({
    modelVersionId,
    limit = 20,
    offset = 0,
  }: GetChecksAggreagationParams): Observable<ChecksAggregationResponse[]> {
    const params = {
      limit: `${limit}`,
      offset: `${offset}`,
    };

    return this.http.get(
      `${this.baseUrl}/checks/aggregates/${modelVersionId}`,
      {
        params,
      }
    );
  }
}
