import {
  Component,
  ViewEncapsulation,
  OnInit,
  OnDestroy,
} from '@angular/core';

import * as fromApplications from '@applications/reducers';
import { HydroServingState } from '@core/reducers';
import { DialogService } from '@dialog/dialog.service';
import { Store } from '@ngrx/store';
import {
  Application,
  ModelVersion,
  ApplicationStatus,
} from '@shared/models/_index';
import { Observable } from 'rxjs';

import {
  DialogDeleteApplicationComponent,
  DialogUpdateApplicationComponent,
  DialogUpdateModelVersionComponent,
  SELECTED_MODEL_VARIANT,
  SELECTED_UPD_APPLICATION$,
  DialogTestComponent,
  SELECTED_APPLICATION$,
  LATEST_MODEL_VERSION,
  SELECTED_DEL_APPLICATION$,
} from '@applications/components/dialogs';

@Component({
  selector: 'hs-applications-item-detail',
  templateUrl: './applications-item-detail.component.html',
  styleUrls: ['./applications-item-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ApplicationsItemDetailComponent implements OnInit, OnDestroy {
  application$: Observable<Application>;
  modelVersions: ModelVersion[];

  constructor(
    private store: Store<HydroServingState>,
    private dialog: DialogService
  ) {
    this.application$ = this.store.select(
      fromApplications.getSelectedApplication
    );
  }

  ngOnInit() {}

  ngOnDestroy() {}

  public updateModelVersionDialog(lastModelVersion, modelVariant) {
    this.dialog.createDialog({
      component: DialogUpdateModelVersionComponent,
      providers: [
        { provide: SELECTED_MODEL_VARIANT, useValue: modelVariant },
        { provide: LATEST_MODEL_VERSION, useValue: lastModelVersion },
      ],
    });
  }

  public testApplication(): void {
    this.dialog.createDialog({
      component: DialogTestComponent,
      providers: [
        { provide: SELECTED_APPLICATION$, useValue: this.application$ },
      ],
    });
  }

  public editApplication(): void {
    this.dialog.createDialog({
      component: DialogUpdateApplicationComponent,
      providers: [
        { provide: SELECTED_UPD_APPLICATION$, useValue: this.application$ },
      ],
      styles: {
        height: '100%',
      },
    });
  }

  public removeApplication() {
    this.dialog.createDialog({
      component: DialogDeleteApplicationComponent,
      providers: [
        { provide: SELECTED_DEL_APPLICATION$, useValue: this.application$ },
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
