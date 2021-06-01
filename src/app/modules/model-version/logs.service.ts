import {
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  ViewContainerRef,
} from '@angular/core';
import { ModelVersionLogComponent } from '@app/modules/model-version/components';
import { ServableLogsComponent } from '@app/modules/servables/containers';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LogsService {
  public viewContainerRef: ViewContainerRef;
  private current: ComponentRef<
    ModelVersionLogComponent | ServableLogsComponent
  >;

  private logIsVisible: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public logIsVisible$: Observable<boolean> = this.logIsVisible.asObservable();

  constructor(private resolver: ComponentFactoryResolver) {}

  public showBuildLog(modelVersionId: number) {
    this.viewContainerRef.clear();
    const factory = this.resolver.resolveComponentFactory(
      ModelVersionLogComponent
    );
    const component = this.viewContainerRef.createComponent(factory);

    this.current = component;
    component.instance.modelVersion = modelVersionId;
    component.instance.closed.subscribe(() => this.closeGlobalLog());
    component.changeDetectorRef.detectChanges();
    this.toggleGlobalLog();
  }

  public showServableLogs(name: string) {
    this.viewContainerRef.clear();
    const factory = this.resolver.resolveComponentFactory(
      ServableLogsComponent
    );
    const component = this.viewContainerRef.createComponent(factory);
    this.current = component;
    component.instance.servableName = name;
    component.instance.closed.subscribe(() => this.closeGlobalLog());
    component.changeDetectorRef.detectChanges();
    this.toggleGlobalLog();
  }

  public toggleGlobalLog(): void {
    this.logIsVisible.next(!this.logIsVisible.value);
  }

  public closeGlobalLog(): void {
    this.current.destroy();
    this.viewContainerRef.clear();
    this.logIsVisible.next(false);
  }

  public setViewContainerRef(value: ViewContainerRef): void {
    this.viewContainerRef = value;
  }
}
