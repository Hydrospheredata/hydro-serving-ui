import { Component, OnInit, InjectionToken, Inject, HostListener } from '@angular/core';
import { MdlDialogReference, MdlSnackbarService } from '@angular-mdl/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { HttpModelServiceService, ModelsService, ServingEnvironmentService } from '@shared/services/_index';

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
  public deployModelForm: FormGroup;
  private data;
  public model;
  public isDeployable = false;
  public isModelService = false;
  public currentModelEnvironment: number;
  public environments: any;
  constructor(
    @Inject(injectableModelDeployOptions) data,
    public dialogRef: MdlDialogReference,
    private fb: FormBuilder,
    private mdlSnackbarService: MdlSnackbarService,
    private modelServiceService: HttpModelServiceService,
    private store: Store<AppState>,
    private modelsService: ModelsService,
    private modelBuilder: ModelBuilder,
    private servingEnvironmentService: ServingEnvironmentService
  ) {
    this.model = data;
  }

  ngOnInit() {
    this.createDeployModelForm();
    this.servingEnvironmentService.getEnvironments().subscribe(data => {
      this.environments = data;
      console.log(this.environments);
      this.currentModelEnvironment = data[0].id;
    });
  }

  @HostListener('document:keydown.escape')
  public onEsc(): void {
    this.dialogRef.hide();
  }



  createDeployModelForm() {
   this.deployModelForm = this.fb.group({
      environment: [this.currentModelEnvironment, [Validators.required]],
    });
  }

  submitDeployModelForm() {
    console.log(this.currentModelEnvironment);
    this.modelServiceService.createService
    (`${this.model.modelName}_${this.model.modelVersion}`,
    this.model.id,
    this.currentModelEnvironment)
      .subscribe(result => {
        this.dialogRef.hide();
        this.mdlSnackbarService.showSnackbar({
          message: 'Service has been deployed',
          timeout: 5000
        });
        this.store.dispatch({ type: Actions.SWITCH_MODEL, payload: this.model.modelId });
      },
      (error) => {
        this.mdlSnackbarService.showSnackbar({
          message: error,
          timeout: 5000
        });
      });

  }

}
