import { Component, OnInit, InjectionToken, HostListener, Inject } from '@angular/core';
import { MdlDialogReference, MdlDialogService } from '@angular-mdl/core';
import { MdlSnackbarService } from '@angular-mdl/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpRuntimeTypesService } from '@services/http-runtime-types.service';
import { BuildModelService } from '@services/build-model.service';
import { HttpModelsService } from '@services/http-models.service';
import { ModelStore } from '@stores/model.store';

import 'rxjs/add/operator/mergeMap';

export let injectableModelOptions = new InjectionToken<object>('injectableModelOptions');

@Component({
  selector: 'hydro-dialog-model-build',
  templateUrl: './dialog-model-build.component.html',
  styleUrls: ['./dialog-model-build.component.scss'],
  providers: [MdlSnackbarService, FormBuilder, BuildModelService, HttpModelsService]
})
export class DialogModelBuildComponent implements OnInit {
  public buildModelForm: FormGroup;
  public currentRuntimeType;
  public runtimeTypes;
  public data;
  public model;

  constructor(private fb: FormBuilder,
              public dialogRef: MdlDialogReference,
              private mdlSnackbarService: MdlSnackbarService,
              private httpRuntimeTypesService: HttpRuntimeTypesService,
              @Inject(injectableModelOptions) data,
              private buildModelService: BuildModelService,
              private modelStore: ModelStore
              ) {
    this.model = data;
  }

  ngOnInit() {
    this.createBuildModelForm();
    this.httpRuntimeTypesService.getAll().subscribe((runtimeType) => {
      this.runtimeTypes = runtimeType;
    });
  }

  @HostListener('keydown.esc')
  public onEsc(): void {
    this.dialogRef.hide();
  }

  private createBuildModelForm() {
    const modelType = this.model.lastModelRuntime.runtimeType ? this.model.lastModelRuntime.runtimeType.tags : '';
    this.buildModelForm = this.fb.group({
      version: [this.model.runtimeType.version],
      modelId: [this.model.id],
      name: [this.model.name],
      status: [this.model.lastModelBuild.status],
      runtimeType: [this.model.runtimeType, [Validators.required]],
      modelType: [modelType, []],
      source: [this.model.source, []],
      inputFields: [this.model.inputFields, []],
      outputFields: [this.model.outputFields, []],
    });
  }

  submitBuildModelForm(buildModelForm) {
    const controls = buildModelForm.controls;
    const modelOptions = {
      id: controls.modelId.value,
      version: controls.version.value,
      name: controls.name.value,
      source: controls.source.value,
      status: controls.status.value,
      runtimeTypeId: +controls.runtimeType.value,
      modelType: controls.modelType.value,
      inputFields: controls.inputFields.value,
      outputFields: controls.outputFields.value
    };

    this.modelStore.updateModel(modelOptions)
      .flatMap((model) => {
        return this.buildModelService.build({modelVersion: modelOptions.version, modelId: modelOptions.id, runtimeTypeId: 1});
      })
      .subscribe((model) => {
        this.modelStore.getAll();
        this.dialogRef.hide();
        this.mdlSnackbarService.showSnackbar({
          message: `Model was successfully updated`,
          timeout: 5000
        });
      }, (error) => {
        this.mdlSnackbarService.showSnackbar({
          message: `Error: ${error}`,
          timeout: 5000
        });
      });
  }

}
