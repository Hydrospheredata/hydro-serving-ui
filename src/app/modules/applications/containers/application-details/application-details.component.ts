import { Component, OnInit } from '@angular/core';
import {
  Application,
  IModelVariant,
  ApplicationStatus, ModelVersion, ModelVersionServiceStatusesEntity,
} from '@app/core/data/types';
import { ApplicationsFacade } from '@app/core/facades/applications.facade';
import {
  DialogUpdateModelVersionComponent,
  SELECTED_MODEL_VARIANT,
  LATEST_MODEL_VERSION,
  DialogTestComponent,
  SELECTED_APPLICATION,
  DialogUpdateApplicationComponent,
  SELECTED_UPD_APPLICATION,
  DialogDeleteApplicationComponent,
  SELECTED_DEL_APPLICATION,
} from '@app/modules/dialogs/components';
import { DialogsService } from '@app/modules/dialogs/dialogs.service';
import * as _ from 'lodash'

import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { filter, take } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { HydroServingState } from '@app/core/store/states/root.state';
import { selectServiceStatusesById } from '@app/core/store/selectors/service-statuses.selectors';
import { Get } from '@app/core/store/actions/service-statuses.actions';

interface MenuState {
  showed: boolean;
  context?: IModelVariant | null;
  top: number;
  left: number;
  statuses: ModelVersionServiceStatusesEntity
}
const initialMenuState: MenuState = {
  showed: false,
  context: null,
  top: 0,
  left: 0,
  statuses: null
};

@Component({
  selector: 'hs-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.scss'],
})
export class ApplicationDetailsComponent implements OnInit {
  application$: Observable<Application>;

  menu$: Observable<MenuState>;
  private menu: BehaviorSubject<MenuState> = new BehaviorSubject(
    initialMenuState
  );

  constructor(
    private readonly dialog: DialogsService,
    private readonly facade: ApplicationsFacade,
    private readonly store: Store<HydroServingState>
  ) {
    this.menu$ = this.menu.asObservable();
  }

  ngOnInit() {
    this.application$ = this.facade.selectedApplication();
    if (this.application$) {}
    this.application$.pipe(
      filter(value => value != undefined),
      map(value => value.executionGraph.stages.map(stage =>
        stage.modelVariants.map(modelVariant =>
        modelVariant.modelVersion)
        )
      ),
      map(res => {
        const flatted = _.flatten(res);
        flatted.forEach(modelVersion => {
          this.store.dispatch(Get({ payload: modelVersion }));
        })
      })
    ).subscribe();
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
    this.store.pipe(
      take(1),
      select(selectServiceStatusesById(modelVariant.modelVersion.id))
    ).subscribe(statuses => {
      this.menu.next({
        showed: true,
        context: modelVariant,
        left: evt.clientX - 12,
        top: evt.clientY - 12,
        statuses: statuses
      });
    })
  }

  public onMouseLeave(): void {
    const menuState = this.menu.getValue();
    this.menu.next({
      showed: false,
      context: menuState.context,
      top: menuState.top,
      left: menuState.left,
      statuses: menuState.statuses
    });
  }
}
