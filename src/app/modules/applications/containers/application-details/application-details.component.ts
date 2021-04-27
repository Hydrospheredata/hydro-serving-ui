import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Application,
  IModelVariant,
  ApplicationStatus,
  ModelVersionServiceStatusesEntity, ModelVersion,
} from '@app/core/data/types';
import { ApplicationsFacade } from '@app/core/facades/applications.facade';
import { ServiceStatusesFacade } from '@app/core/facades/service-statuses.facade';
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
import * as _ from 'lodash';

import { Observable, BehaviorSubject, combineLatest, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/internal/operators';
import { filter } from 'rxjs/operators';
import { Dictionary } from '@ngrx/entity';

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

function getModelVersions(value: Application): ModelVersion[] {
  return _.flatten(value.executionGraph.stages.map(stage =>
    stage.modelVariants.map(modelVariant =>
      modelVariant.modelVersion)
  ));
}

@Component({
  selector: 'hs-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.scss'],
})
export class ApplicationDetailsComponent implements OnInit, OnDestroy {
  application$: Observable<Application>;

  menu$: Observable<MenuState>;
  private menu: BehaviorSubject<MenuState> = new BehaviorSubject(
    initialMenuState
  );

  mv$: Observable<Dictionary<ModelVersionServiceStatusesEntity>>;
  private mvSubscription: Subscription;

  constructor(
    private readonly dialog: DialogsService,
    private readonly facade: ApplicationsFacade,
    private readonly serviceFacade: ServiceStatusesFacade
  ) {
    this.menu$ = this.menu.asObservable();
  }

  ngOnInit() {
    this.application$ = this.facade.selectedApplication();

    this.mv$ = this.serviceFacade.allStatusesEntities();

    this.mvSubscription = combineLatest([this.application$, this.mv$]).pipe(
      filter(tuple => {
        const [app, statuses] = tuple;
        return app !== undefined;
      }),
      map(tuple => {
        const [app, statuses] = tuple;
        const mvs = getModelVersions(app);
        return mvs.filter(mv => statuses[mv.id] == undefined);
      }),
      filter(mvs => {
        return mvs.length > 0;
      }),
      tap(mvs => {
        return mvs.forEach(mv => this.serviceFacade.loadAll(mv));
      })
    ).subscribe();
  }

  ngOnDestroy() {
    this.mvSubscription.unsubscribe();
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
    this.serviceFacade.selectServiceStatusesById(modelVariant.modelVersion.id)
      .subscribe(statuses => {
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
