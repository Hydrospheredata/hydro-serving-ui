import { Component, ViewEncapsulation, Input } from '@angular/core';

import {
  DialogDeleteApplicationComponent,
  DialogUpdateApplicationComponent,
  DialogUpdateModelVersionComponent,
  SELECTED_MODEL_VARIANT,
  SELECTED_UPD_APPLICATION,
  DialogTestComponent,
  SELECTED_APPLICATION,
  LATEST_MODEL_VERSION,
  SELECTED_DEL_APPLICATION,
} from '@applications/components/dialogs';

import { DialogService } from '@dialog/dialog.service';
import { BehaviorSubject, Observable } from '@node_modules/rxjs';
import { Application, ApplicationStatus, IModelVariant } from '@shared/models';

interface MenuState {
  showed: boolean;
  context?: IModelVariant | null;
  top: number;
  left: number;
}
const initialMenuState: MenuState = {
  showed: false,
  context: null,
  top: 0,
  left: 0,
};

@Component({
  selector: 'hs-applications-item-detail',
  templateUrl: './applications-item-detail.component.html',
  styleUrls: ['./applications-item-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ApplicationsItemDetailComponent {
  @Input() application: Application;

  public menu$: Observable<MenuState>;
  private menu: BehaviorSubject<MenuState> = new BehaviorSubject(
    initialMenuState
  );
  constructor(private dialog: DialogService) {
    this.menu$ = this.menu.asObservable();
  }

  public updateModelVersionDialog(lastModelVersion, modelVariant) {
    this.dialog.createDialog({
      component: DialogUpdateModelVersionComponent,
      providers: [
        { provide: SELECTED_MODEL_VARIANT, useValue: modelVariant },
        { provide: LATEST_MODEL_VERSION, useValue: lastModelVersion },
      ],
    });
  }

  public testApplication(application): void {
    this.dialog.createDialog({
      component: DialogTestComponent,
      providers: [{ provide: SELECTED_APPLICATION, useValue: application }],
    });
  }

  public editApplication(application): void {
    this.dialog.createDialog({
      component: DialogUpdateApplicationComponent,
      providers: [{ provide: SELECTED_UPD_APPLICATION, useValue: application }],
      styles: {
        height: '100%',
      },
    });
  }

  public removeApplication(application: Application) {
    this.dialog.createDialog({
      component: DialogDeleteApplicationComponent,
      providers: [{ provide: SELECTED_DEL_APPLICATION, useValue: application }],
    });
  }

  public isReady(status: string): boolean {
    return status === ApplicationStatus.Ready;
  }

  public isFailed(status: string): boolean {
    return status === ApplicationStatus.Failed;
  }

  public onClickModelVariant(
    evt: MouseEvent,
    modelVariant: IModelVariant
  ): void {
    this.menu.next({
      showed: true,
      context: modelVariant,
      left: evt.clientX - 12,
      top: evt.clientY - 12,
    });
  }

  public onMouseLeave(): void {
    this.menu.next({
      showed: false,
      context: this.menu.getValue().context,
      top: this.menu.getValue().top,
      left: this.menu.getValue().left,
    });
  }
}
