import {
  Component,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef,
} from '@angular/core';
import { ApplicationsFacade } from '@applications/store';
import {
  ModelVersionLogComponent
} from '@models/components/model-version/model-version-log/model-version-log.component';
import { ModelVersionLogService } from '@models/services/model-version-log.service';
import { ModelsFacade } from '@models/store';
import { ServableLogsComponent } from '@servables/containers';
import { ModelVersionStatus, ModelVersion } from '@shared/_index';
import { isEmpty } from 'lodash';
import { map } from 'rxjs/operators';
@Component({
  selector: 'hydro-model-version-details',
  templateUrl: './model-version-details.component.html',
  styleUrls: ['./model-version-details.component.scss'],
  providers: [ModelVersionLogService],
})
export class ModelVersionDetailsComponent {
  @ViewChild('logContainer', { read: ViewContainerRef })
  logContainer: ViewContainerRef;

  modelVersion$ = this.modelsFacade.selectedModelVersion$;
  released$ = this.modelVersion$.pipe(
    map(({ status }) => status === ModelVersionStatus.Released)
  );
  servables$ = this.modelsFacade.selectedServables$;
  signature$ = this.modelsFacade.signature$;
  showLog: boolean = false;
  globalLog: boolean = false;
  private current: ComponentRef<any>;

  constructor(
    private modelsFacade: ModelsFacade,
    private resolver: ComponentFactoryResolver,
    private applicationsFacade: ApplicationsFacade
  ) {}

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
}
