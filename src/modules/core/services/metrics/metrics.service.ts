
import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http';
import { environment } from '@environments/environment';
import { IMetricSpecification, IMetricSpecificationProvider } from '@shared/models/metric-specification.model';
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
@Injectable()
export class MetricsService {

  private baseMetricsUrl: string;

  constructor(
    private http: HttpService
  ) {
    this.baseMetricsUrl = `${environment.monitoringUrl}`;
  }

  public getMetrics(
    modelVersionId: string,
    interval: string,
    metrics: string[],
    columnIndex?: string
    ): Promise<IMetricData[]> {
      return this.http.get(
          `${this.baseMetricsUrl}/metrics`,
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
    return this.http.get(`${this.baseMetricsUrl}/health`).pipe(
      map((res: Response): any => res)
    ).toPromise();
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

  public getMetricsBySpec(spec: string): string[] {
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
