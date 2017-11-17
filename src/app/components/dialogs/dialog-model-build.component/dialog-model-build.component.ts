import { Component, OnInit, InjectionToken, HostListener, Inject } from '@angular/core';
import { MdlDialogReference, MdlDialogService, MdlSnackbarService } from '@angular-mdl/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {
  HttpRuntimeTypesService,
  BuildModelService,
  HttpModelsService,
  ModelsService,
  ServingEnvironmentService
} from '@shared/services/_index';
import { ModelStatusPipe } from '@shared/pipes/_index';
import { Store } from '@ngrx/store';
import { AppState, ServingEnvironment } from '@shared/models/_index';
import * as Actions from '@shared/actions/_index';
import { ModelBuilder } from '@shared/builders/_index';
import 'rxjs/add/operator/mergeMap';

export let injectableModelOptions = new InjectionToken<object>('injectableModelOptions');

@Component({
  selector: 'hydro-dialog-model-build',
  templateUrl: './dialog-model-build.component.html',
  styleUrls: ['./dialog-model-build.component.scss'],
  providers: [MdlSnackbarService, FormBuilder, BuildModelService, HttpModelsService, ModelStatusPipe]
})
export class DialogModelBuildComponent implements OnInit {
  public buildModelForm: FormGroup;
  public currentModelRuntimeType;
  public currentModelRuntimeTypeVersion;
  public currentModelEnvironment;
  public runtimeTypes;
  public runtimeTypeNames;
  public selectedRuntimeType;
  public data;
  public model;
  public modelType: string;
  public environments: ServingEnvironment[];

  constructor(private fb: FormBuilder,
              public dialogRef: MdlDialogReference,
              private mdlSnackbarService: MdlSnackbarService,
              private httpRuntimeTypesService: HttpRuntimeTypesService,
              @Inject(injectableModelOptions) data,
              private buildModelService: BuildModelService,
              private modelStatusPipe: ModelStatusPipe,
              private store: Store<AppState>,
              private modelsService: ModelsService,
              private modelBuilder: ModelBuilder,
              private servingEnvironmentService: ServingEnvironmentService
              ) {
    this.model = data;
  }

  ngOnInit() {
    const self = this;
    this.createBuildModelForm();
    this.httpRuntimeTypesService.getAll().subscribe((runtimeType) => {
      this.runtimeTypes = runtimeType;
      this.runtimeTypeNames = new Set(this.runtimeTypes.map((runtimeType) => runtimeType.name));
      self.currentModelRuntimeType = self.model.runtimeType.name;
      self.onRuntimeSelect(self.currentModelRuntimeType);
      self.currentModelRuntimeTypeVersion = self.model.runtimeType.id;
    });
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

  private createBuildModelForm() {
    const modelStatus = this.modelStatusPipe.transform(this.model);
    this.modelType = this.model.lastModelRuntime.runtimeType ? this.model.lastModelRuntime.runtimeType.tags : '';
    this.buildModelForm = this.fb.group({
      modelId: [this.model.id],
      name: [this.model.name],
      status: [modelStatus],
      runtimeType: [this.model.runtimeType, [Validators.required]],
      runtimeTypeName: [this.model.runtimeType.name],
      environment: [this.currentModelEnvironment, [Validators.required]],
      modelType: [this.modelType, []],
      source: [this.model.source, []],
      inputFields: [this.model.inputFields, []],
      outputFields: [this.model.outputFields, []],
    });
  }

  public onRuntimeSelect(value) {
    console.log(value);
    this.selectedRuntimeType = this.runtimeTypes.filter((runtimeType) => runtimeType.name === value);
    this.currentModelRuntimeTypeVersion = this.selectedRuntimeType[0].id;
  }

  public getRuntimeTypeTags(runtimeTypeName: number | string) {
    if (!this.runtimeTypes || this.runtimeTypes.length === 0 || !runtimeTypeName) {
      return [];
    }
    if (typeof runtimeTypeName === 'number') {
      return this.runtimeTypes.find(runtimeType => runtimeType.id === runtimeTypeName)['tags'];
    } else {
    return this.runtimeTypes.find(runtimeType => runtimeType.name === runtimeTypeName)['tags'];
    }
  }

  submitBuildModelForm(buildModelForm) {
    const controls = buildModelForm.controls;
    const modelOptions = {
      id: controls.modelId.value,
      name: controls.name.value,
      source: controls.source.value,
      status: controls.status.value,
      runtimeTypeId: +controls.runtimeType.value,
      modelType: controls.modelType.value,
      inputFields: controls.inputFields.value,
      outputFields: controls.outputFields.value,
      environmentId: controls.environment.value
    };


    this.modelsService.updateModel(modelOptions)
    .flatMap(model => {
      return this.buildModelService.build(
        {modelVersion: null,
          modelId: modelOptions.id,
          runtimeTypeId: modelOptions.runtimeTypeId,
          environmentId: Number(modelOptions.environmentId)});
    })
    .subscribe((model) => {
      this.dialogRef.hide();
      this.mdlSnackbarService.showSnackbar({
        message: `Model was successfully updated`,
        timeout: 5000
      });
      this.store.dispatch({ type: Actions.SWITCH_MODEL, payload: modelOptions.id });
    }, (error) => {
      this.mdlSnackbarService.showSnackbar({
        message: `Error: ${error}`,
        timeout: 5000
      });
    });

  }
}
