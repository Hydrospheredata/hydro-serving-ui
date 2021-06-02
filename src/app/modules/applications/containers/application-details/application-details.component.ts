import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Application,
  ModelVariant,
  ApplicationStatus,
  ModelVersionServiceStatusesEntity,
  Servable,
  ModelVersionId,
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
import { map, mergeAll, tap } from 'rxjs/internal/operators';
import { filter } from 'rxjs/operators';
import { Dictionary } from '@ngrx/entity';
import { ServablesFacade } from '@app/core/facades/servables.facade';
import { ModelVersionsFacade } from '@app/core/facades/model-versions.facade';

interface MenuState {
  showed: boolean;
  context?: ModelVariant | null;
  top: number;
  left: number;
  statuses: ModelVersionServiceStatusesEntity;
}
const initialMenuState: MenuState = {
  showed: false,
  context: null,
  top: 0,
  left: 0,
  statuses: null,
};

function getModelVersionsIds(value: Application): ModelVersionId[] {
  return _.flatten(
    value.executionGraph.stages.map(stage =>
      stage.modelVariants.map(modelVariant => modelVariant.modelVersionId),
    ),
  );
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
    initialMenuState,
  );

  mv$: Observable<Dictionary<ModelVersionServiceStatusesEntity>>;
  private mvSubscription: Subscription;

  constructor(
    private readonly dialog: DialogsService,
    private readonly facade: ApplicationsFacade,
    private readonly serviceFacade: ServiceStatusesFacade,
    private readonly servablesFacade: ServablesFacade,
    private readonly modelVersionsFacade: ModelVersionsFacade,
  ) {
    this.menu$ = this.menu.asObservable();
  }

  ngOnInit() {
    this.application$ = this.facade.selectedApplication();

    this.mv$ = this.serviceFacade.allStatusesEntities();

    this.mvSubscription = combineLatest([this.application$, this.mv$])
      .pipe(
        filter(tuple => {
          const [app, statuses] = tuple;
          return app !== undefined;
        }),
        map(tuple => {
          const [app, statuses] = tuple;
          const mvsId = getModelVersionsIds(app);
          return mvsId.filter(id => statuses[id] === undefined);
        }),
        filter(ids => {
          return ids.length > 0;
        }),
        tap(ids => {
          return ids.forEach(id => this.serviceFacade.loadAll(id));
        }),
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.mvSubscription.unsubscribe();
  }

  public getServableByName(name: string): Observable<Servable[]> {
    return this.servablesFacade.selectServableByName(name);
  }

  public getModelVersionById(id: number) {
    return this.modelVersionsFacade.modelVersionById(id);
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

  public testApplication(application: Application): void {
    this.dialog.createDialog({
      component: DialogTestComponent,
      providers: [{ provide: SELECTED_APPLICATION, useValue: application }],
    });
  }

  public editApplication(application: Application): void {
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
    modelVariant: ModelVariant,
  ): void {
    this.serviceFacade
      .selectServiceStatusesById(modelVariant.modelVersionId)
      .subscribe(statuses => {
        this.menu.next({
          showed: true,
          context: modelVariant,
          left: evt.clientX - 12,
          top: evt.clientY - 12,
          statuses: statuses,
        });
      });
  }

  public onMouseLeave(): void {
    const menuState = this.menu.getValue();
    this.menu.next({
      showed: false,
      context: menuState.context,
      top: menuState.top,
      left: menuState.left,
      statuses: menuState.statuses,
    });
  }
}
