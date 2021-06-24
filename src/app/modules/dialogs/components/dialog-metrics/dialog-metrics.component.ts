import {
  ChangeDetectionStrategy,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
  ViewContainerRef,
  Component,
} from '@angular/core';
import { DialogMetricComponent } from '../dialog-metric/dialog-metric.component';
import { DialogDeleteMetricComponent } from '../dialog-delete-metric/dialog-delete-metric.component';
import { Observable } from 'rxjs';
import { DialogsService } from '@app/modules/dialogs/dialogs.service';
import { ModelVersionsFacade } from '@app/core/facades/model-versions.facade';
import { MetricSpecification, ModelVersion } from '@app/core/data/types';

import { MetricsFacade } from '../../../monitoring/store/facades/metrics.facade';

@Component({
  selector: 'hs-dialog-metrics',
  templateUrl: './dialog-metrics.component.html',
  styleUrls: ['./dialog-metrics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogMetricsComponent implements OnInit {
  layout: boolean = false;
  metrics$: Observable<MetricSpecification[]>;
  modelVersion$: Observable<ModelVersion> =
    this.modelVersionsFacade.selectedModelVersion();

  @ViewChild('container', { read: ViewContainerRef, static: true })
  private vcr: ViewContainerRef;

  constructor(
    private dialog: DialogsService,
    private resolver: ComponentFactoryResolver,
    private metricsFacade: MetricsFacade,
    private modelVersionsFacade: ModelVersionsFacade,
  ) {}

  onAddMetric(modelVersion: ModelVersion) {
    event.preventDefault();
    try {
      this.layout = true;
      this.vcr.clear();
      const factory = this.resolver.resolveComponentFactory(
        DialogMetricComponent,
      );
      const component = this.vcr.createComponent(factory);
      component.instance.modelVersion = modelVersion;
      component.instance.closed.subscribe(_ => {
        this.layout = false;
        this.vcr.clear();
      });
    } catch (error) {
      console.error(error);
      this.vcr.clear();
    }
  }

  ngOnInit() {
    this.metrics$ = this.metricsFacade.getSelectedMetrics();
  }

  modelVersionById$(id) {
    return this.modelVersionsFacade.modelVersionById(id);
  }

  onDeleteMetric(metricId: string) {
    try {
      this.layout = true;
      this.vcr.clear();
      const factory = this.resolver.resolveComponentFactory(
        DialogDeleteMetricComponent,
      );
      const component = this.vcr.createComponent(factory);
      component.instance.metricId = metricId;
      component.instance.closed.subscribe(() => {
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
