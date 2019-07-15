import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
} from '@angular/core';
import { HydroServingState, getSelectedMetrics } from '@core/reducers';
import { DialogService } from '@dialog/dialog.service';
import {
  DialogMetricComponent,
  DialogDeleteMetricComponent,
} from '@monitoring/components';
import { Store } from '@ngrx/store';
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
    private store: Store<HydroServingState>,
    private dialog: DialogService,
    private resolver: ComponentFactoryResolver
  ) {}

  onAddMetric() {
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
    this.metrics$ = this.store.select(getSelectedMetrics);
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
