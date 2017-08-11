import { Component, OnInit, InjectionToken, HostListener, Inject } from '@angular/core';
import { RuntimeType } from '@models/runtime-type';
import { MdlDialogReference, MdlDialogService } from '@angular-mdl/core';
import { MdlSnackbarService } from '@angular-mdl/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpRuntimeTypesService } from '@services/http-runtime-types.service';
import { BuildModelService } from '@services/build-model.service';
import { HttpModelsService } from '@services/http-models.service';

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
              private dialog: MdlDialogService,
              private httpRuntimeTypesService: HttpRuntimeTypesService,
              @Inject(injectableModelOptions) data,
              private httpModelsService: HttpModelsService
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
    this.buildModelForm = this.fb.group({
      version: [this.model.runtimeType.version, [Validators.required]],
      modelId: [this.model.id],
      name: [this.model.name, [Validators.required]],
      inputFields: [this.model.inputFields, [Validators.required]],
      outputFields: [this.model.outputFields, [Validators.required]],
      runtimeType: [this.model.runtimeType],
      source: [this.model.source, [Validators.required]]
    });
  }

  private updateBuildModelForm(model) {
    this.buildModelForm.setValue({
      version: model.version,
      modelId: model.modelId,
      name: model.name,
      inputFields: model.inputFields,
      outputFields: model.outputFields,
      runtimeType: model.runtimeType,
      source: model.source
    });
  }

  submitBuildModelForm(buildModelForm) {
    const controls = buildModelForm.controls;
    const updatedModel = {
      id: controls.modelId.value,
      name: controls.name.value,
      inputFields: controls.inputFields.value,
      outputFields: controls.outputFields.value,
      runtimeTypeId: controls.runtimeType.value,
      source: controls.source.value
    };
    // this.buildModelService.build(modelOptions)
    //   .subscribe((modelRuntime) => {
    //   let model = this.models.find((item) => item.id === modelRuntime.modelId);
    //   model.lastModelRuntime = modelRuntime;
    // });
    this.httpModelsService.updateModel(updatedModel)
      .subscribe((model) => {
      });

  }

}
