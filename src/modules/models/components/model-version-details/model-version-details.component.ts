import {
  Component,
  ViewChild,
  ViewContainerRef,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
} from '@angular/core';
import { HydroServingState } from '@core/reducers';
import { ModelVersionLogComponent } from '@models/components/model-version-log/model-version-log.component';
import * as fromModels from '@models/reducers';
import { ModelVersionLogService } from '@models/services/model-version-log.service';
import { Store } from '@ngrx/store';
import { ServableLogsComponent } from '@servables/containers';
import { Servable } from '@servables/models';
import { selectServablesByModelVersionId } from '@servables/selectors';
import { ModelVersion } from '@shared/models/_index';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
@Component({
  selector: 'hydro-model-version-details',
  templateUrl: './model-version-details.component.html',
  styleUrls: ['./model-version-details.component.scss'],
  providers: [ModelVersionLogService],
})
export class ModelVersionDetailsComponent {
  @ViewChild('logContainer', { read: ViewContainerRef })
  logContainer: ViewContainerRef;

  modelVersion$: Observable<ModelVersion>;
  showLog: boolean = false;
  servables$: Observable<Servable[]>;

  globalLog: boolean = false;

  constructor(
    private store: Store<HydroServingState>,
    private resolver: ComponentFactoryResolver
  ) {
    this.modelVersion$ = this.store
      .select(fromModels.getSelectedModelVersion)
      .pipe(filter(mv => !!mv));

    this.servables$ = this.modelVersion$.pipe(
      switchMap(({ id }) =>
        this.store.select(selectServablesByModelVersionId(id))
      )
    );
  }

  showBuildLog(modelVersionId: number) {
    this.logContainer.clear();
    const factory = this.resolver.resolveComponentFactory(
      ModelVersionLogComponent
    );
    const component = this.logContainer.createComponent(factory);

    component.instance.modelVersion = modelVersionId;
    component.instance.closed.subscribe(_ => this.closeGlobalLog(component));
    component.changeDetectorRef.detectChanges();
    this.toggleGlobalLog();
  }

  showServableLogs(servableName: string) {
    this.logContainer.clear();
    const factory = this.resolver.resolveComponentFactory(
      ServableLogsComponent
    );

    const component = this.logContainer.createComponent(factory);
    component.instance.servableName = servableName;
    component.instance.closed.subscribe(_ => this.closeGlobalLog(component));
    component.changeDetectorRef.detectChanges();
    this.toggleGlobalLog();
  }

  closeGlobalLog(
    ref: ComponentRef<ModelVersionLogComponent | ServableLogsComponent>
  ): void {
    ref.destroy();
    this.globalLog = false;
  }

  toggleGlobalLog(): void {
    this.globalLog = !this.globalLog;
  }

  isEmpty(obj: object): boolean {
    return _.isEmpty(obj);
  }
}
