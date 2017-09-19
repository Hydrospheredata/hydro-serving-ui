import { Component, OnInit, InjectionToken, Inject, HostListener } from '@angular/core';
import { MdlDialogReference } from '@angular-mdl/core';
import { MdlSnackbarService } from '@angular-mdl/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ModelStore } from '@stores/model.store';
import { ModelServiceStore } from '@shared/stores/model-service.store';
import { Model } from '@models/model';
import { HttpModelServiceService } from '@shared/services/http-model-service.service';
import {
  ModelsService,
  GET_MODELS
} from '@shared/_index';

import { Store } from '@ngrx/store';
import { AppState } from '@shared/models/_index';
import * as Actions from '@shared/actions/_index';
import { ModelBuilder } from '@shared/builders/_index';

export let injectableModelStopOptions = new InjectionToken<object>('injectableModelStopOptions');

@Component({
  selector: 'hydro-dialog-stop-model',
  templateUrl: './dialog-stop-model.component.html',
  styleUrls: ['./dialog-stop-model.component.scss'],
  providers: [],
})
export class DialogStopModelComponent implements OnInit {
  private data;
  public model;

  constructor(
    @Inject(injectableModelStopOptions) data,
    public dialogRef: MdlDialogReference,
    private fb: FormBuilder,
    private modelStore: ModelStore,
    private modelServiceStore: ModelServiceStore,
    private mdlSnackbarService: MdlSnackbarService,
    private modelServiceService: HttpModelServiceService,
    private store: Store<AppState>,
    private modelsService: ModelsService,
    private modelBuilder: ModelBuilder
  ) {
    this.model = data;
  }

  ngOnInit() {
  }

  @HostListener('keydown.esc')
  public onEsc(): void {
    this.dialogRef.hide();
  }

  submitStopModelForm() {
    let id;
    if (this.model instanceof Model) {
      id = this.model.id;
      this.modelStore.stopModel(this.model)
      .subscribe(result => {
        this.dialogRef.hide();
        this.mdlSnackbarService.showSnackbar({
          message: 'Model has been stopped',
          timeout: 5000
        });
        this.modelsService.getModels().first()
        .subscribe(models => {
            this.store.dispatch({ type: Actions.GET_MODELS, payload: models.map(this.modelBuilder.build, this.modelBuilder) });
        });
      },
      (error) => {
        this.mdlSnackbarService.showSnackbar({
          message: error,
          timeout: 5000
        });
      });
    } else {
      id = this.model.serviceId;
      this.modelServiceService.removeService(id)
      .subscribe((data) => {
        this.dialogRef.hide();
        this.mdlSnackbarService.showSnackbar({
          message: 'Model has been stopped',
          timeout: 5000
        });
        this.modelsService.getModels().first()
        .subscribe(models => {
            this.store.dispatch({ type: Actions.GET_MODELS, payload: models.map(this.modelBuilder.build, this.modelBuilder) });
        });
      },
      (error) => {
        this.mdlSnackbarService.showSnackbar({
          message: error,
          timeout: 5000
        });
      });

    }



  }

}
