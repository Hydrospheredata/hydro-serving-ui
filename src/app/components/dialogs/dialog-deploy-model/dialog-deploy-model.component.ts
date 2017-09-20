import { Component, OnInit, InjectionToken, Inject, HostListener } from '@angular/core';
import { MdlDialogReference } from '@angular-mdl/core';
import { MdlSnackbarService } from '@angular-mdl/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ModelServiceStore } from '@stores/model-service.store';
import { HttpModelServiceService } from '@shared/services/http-model-service.service';
import {
  ModelsService
} from '@shared/_index';

import { Store } from '@ngrx/store';
import { AppState } from '@shared/models/_index';
import * as Actions from '@shared/actions/_index';
import { ModelBuilder } from '@shared/builders/_index';
export let injectableModelDeployOptions = new InjectionToken<object>('injectableModelDeployOptions');

@Component({
  selector: 'hydro-dialog-deploy-model',
  templateUrl: './dialog-deploy-model.component.html',
  styleUrls: ['./dialog-deploy-model.component.scss'],
  providers: [],
})
export class DialogDeployModelComponent implements OnInit {
  private data;
  public createServiceEntity;

  constructor(
    @Inject(injectableModelDeployOptions) data,
    public dialogRef: MdlDialogReference,
    private fb: FormBuilder,
    private modelServiceStore: ModelServiceStore,
    private mdlSnackbarService: MdlSnackbarService,
    private modelServiceService: HttpModelServiceService,
    private store: Store<AppState>,
    private modelsService: ModelsService,
    private modelBuilder: ModelBuilder
  ) {
    this.createServiceEntity = data;
  }

  ngOnInit() {
  }

  @HostListener('keydown.esc')
  public onEsc(): void {
    this.dialogRef.hide();
  }

  submitDeployModelForm() {
    this.modelServiceService.createService(this.createServiceEntity.serviceName, this.createServiceEntity.modelRuntimeId)
      .subscribe(result => {
        this.dialogRef.hide();
        this.mdlSnackbarService.showSnackbar({
          message: 'Service has been deployed',
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
