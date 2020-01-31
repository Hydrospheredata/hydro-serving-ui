import {
  Component,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ApplicationsFacade } from '@applications/store';
import { ModelVersionLogService } from '@models/services/model-version-log.service';
import { ServableLogsComponent } from '@servables/containers';
import { Servable } from '@servables/models';
import { ModelVersionStatus, ModelVersion, ISignature } from '@shared/_index';
import { isEmpty } from 'lodash';
import { ModelVersionLogComponent } from '../model-version-log/model-version-log.component';
@Component({
  selector: 'hs-model-version-details',
  templateUrl: './model-version-details.component.html',
  styleUrls: ['./model-version-details.component.scss'],
  providers: [ModelVersionLogService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModelVersionDetailsComponent {
  @ViewChild('logContainer', { read: ViewContainerRef })
  logContainer: ViewContainerRef;

  @Input() modelVersion: ModelVersion;
  @Input() servables: Servable[];
  @Input() signature: ISignature;
  @Input() services: any = [
    { name: 'monitoring', status: 'ok' },
    { name: 'profiler', status: 'ok' },
    { name: 'visualization', status: 'ok' },
  ];

  showLog: boolean = false;
  globalLog: boolean = false;
  private current: ComponentRef<any>;

  constructor(
    private resolver: ComponentFactoryResolver,
    private applicationsFacade: ApplicationsFacade
  ) {}

  get released(): boolean {
    if (this.modelVersion) {
      return this.modelVersion.status === ModelVersionStatus.Released;
    }
  }
  showBuildLog(modelVersionId: number) {
    this.logContainer.clear();
    const factory = this.resolver.resolveComponentFactory(
      ModelVersionLogComponent
    );
    const component = this.logContainer.createComponent(factory);
    this.current = component;
    component.instance.modelVersion = modelVersionId;
    component.instance.closed.subscribe(() => this.closeGlobalLog());
    component.changeDetectorRef.detectChanges();
    this.toggleGlobalLog();
  }

  showServableLogs(servableName: string) {
    this.logContainer.clear();
    const factory = this.resolver.resolveComponentFactory(
      ServableLogsComponent
    );

    const component = this.logContainer.createComponent(factory);
    this.current = component;
    component.instance.servableName = servableName;
    component.instance.closed.subscribe(() => this.closeGlobalLog());
    component.changeDetectorRef.detectChanges();
    this.toggleGlobalLog();
  }

  closeGlobalLog(): void {
    this.current.destroy();
    this.logContainer.clear();
    this.globalLog = false;
  }

  onAddApplication(modelVersion: ModelVersion): void {
    this.applicationsFacade.createApplicationFromModelVersion(modelVersion);
  }

  toggleGlobalLog(): void {
    this.globalLog = !this.globalLog;
  }

  isEmpty(obj: object): boolean {
    return isEmpty(obj);
  }

  get status(): ModelVersionStatus {
    return this.modelVersion.status;
  }

  get isReleased(): boolean {
    return this.status === ModelVersionStatus.Released;
  }

  get isFailed(): boolean {
    return this.status === ModelVersionStatus.Failed;
  }
}
