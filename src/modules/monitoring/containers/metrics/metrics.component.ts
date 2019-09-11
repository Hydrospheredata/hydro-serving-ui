import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
} from '@angular/core';
import { DialogService } from '@dialog/dialog.service';
import {
  DialogMetricComponent,
  DialogDeleteMetricComponent,
} from '@monitoring/components';
import { MetricsFacade } from '@monitoring/store/facades/metrics.facade';
import { MetricSpecification } from '@shared/models/metric-specification.model';
import { Observable } from 'rxjs';
@Component({
  selector: 'hs-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss'],
})
export class MetricsComponent implements OnInit {
  layout: boolean = false;
  metrics$: Observable<MetricSpecification[]>;

  @ViewChild('container', { read: ViewContainerRef })
  private vcr: ViewContainerRef;

  constructor(
    private dialog: DialogService,
    private resolver: ComponentFactoryResolver,
    private metricsFacade: MetricsFacade
  ) {}

  onAddMetric() {
    event.preventDefault();
    try {
      this.layout = true;
      this.vcr.clear();
      const factory = this.resolver.resolveComponentFactory(
        DialogMetricComponent
      );
      const component = this.vcr.createComponent(factory);
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

  onEditMetric(metricSpecification: MetricSpecification) {
    try {
      this.layout = true;
      this.vcr.clear();
      const factory = this.resolver.resolveComponentFactory(
        DialogMetricComponent
      );
      const component = this.vcr.createComponent(factory);
      component.instance.metricSpecification = metricSpecification;
      component.instance.closed.subscribe(_ => {
        this.layout = false;
        this.vcr.clear();
      });
      component.changeDetectorRef.detectChanges();
    } catch (error) {
      this.vcr.clear();
    }
  }

  onClose() {
    this.dialog.closeDialog();
  }
}
