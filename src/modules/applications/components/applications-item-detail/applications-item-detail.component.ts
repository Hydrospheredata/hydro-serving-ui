import {
  Component,
  ViewEncapsulation,
  Input,
} from '@angular/core';

import { DialogService } from '@dialog/dialog.service';
import {
  Application,
  ApplicationStatus,
} from '@shared/models/_index';
import { Observable } from 'rxjs';

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
import { ApplicationsFacade } from '@applications/store';

@Component({
  selector: 'hs-applications-item-detail',
  templateUrl: './applications-item-detail.component.html',
  styleUrls: ['./applications-item-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ApplicationsItemDetailComponent {
  @Input() application: Application;

  constructor(
    private dialog: DialogService
  ) {
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
      providers: [
        { provide: SELECTED_APPLICATION, useValue: application },
      ],
    });
  }

  public editApplication(application): void {
    this.dialog.createDialog({
      component: DialogUpdateApplicationComponent,
      providers: [
        { provide: SELECTED_UPD_APPLICATION, useValue: application },
      ],
      styles: {
        height: '100%',
      },
    });
  }

  public removeApplication(application: Application) {
    this.dialog.createDialog({
      component: DialogDeleteApplicationComponent,
      providers: [
        { provide: SELECTED_DEL_APPLICATION, useValue: application },
      ],
    });
  }

  public isReady(status: string): boolean {
    return status === ApplicationStatus.Ready;
  }

  public isFailed(status: string): boolean {
    return status === ApplicationStatus.Failed;
  }
}
