import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  ChangeDetectionStrategy,
} from '@angular/core';
import { DialogService } from '@dialog/dialog.service';
import { ModelsFacade } from '@models/store';
import {
  DialogMetricComponent,
  DialogDeleteMetricComponent,
} from '@monitoring/components';
import { MetricsFacade } from '@monitoring/store/facades/metrics.facade';
import { ModelVersion } from '@shared/_index';
import { MetricSpecification } from '@shared/models/metric-specification.model';
import { Observable } from 'rxjs';
@Component({
  selector: 'hs-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetricsComponent implements OnInit {
  layout: boolean = false;
  metrics$: Observable<MetricSpecification[]>;
  modelVersion$: Observable<ModelVersion> = this.modelsFacade
    .selectedModelVersion$;

  @ViewChild('container', { read: ViewContainerRef })
  private vcr: ViewContainerRef;

  constructor(
    private dialog: DialogService,
    private resolver: ComponentFactoryResolver,
    private metricsFacade: MetricsFacade,
    private modelsFacade: ModelsFacade
  ) {}

  onAddMetric(modelVersion: ModelVersion) {
    event.preventDefault();
    try {
      this.layout = true;
      this.vcr.clear();
      const factory = this.resolver.resolveComponentFactory(
        DialogMetricComponent
      );
      const component = this.vcr.createComponent(factory);
      component.instance.modelVersion = modelVersion;
      component.instance.closed.subscribe(_ => {
        this.layout = false;
        this.vcr.clear();
      });
    } catch (error) {
      this.vcr.clear();
    }
  }

  ngOnInit() {
    this.metrics$ = this.metricsFacade.selectedMetrics$;
  }

  modelVersionById$(id) {
    return this.modelsFacade.selectModelVersionById$(id);
  }

  onDeleteMetric(metricId: string) {
    try {
      this.layout = true;
      this.vcr.clear();
      const factory = this.resolver.resolveComponentFactory(
        DialogDeleteMetricComponent
      );
      const component = this.vcr.createComponent(factory);
      component.instance.metricId = metricId;
      component.instance.closed.subscribe(_ => {
        this.layout = false;
        this.vcr.clear();
      });
    } catch (error) {
      this.vcr.clear();
    }
  }

  onClose() {
    this.dialog.closeDialog();
  }
}
