import { Component, OnInit, InjectionToken, Inject, HostListener } from '@angular/core';
import { MdlDialogReference } from '@angular-mdl/core';
import { MdlSnackbarService } from '@angular-mdl/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ModelServiceStore } from '@stores/model-service.store';
import { HttpModelServiceService } from '@shared/services/http-model-service.service';

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
    private modelServiceService: HttpModelServiceService,
    private mdlSnackbarService: MdlSnackbarService
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
      .subscribe((data) => {
        this.modelServiceStore.updateModel(data);
      });

  }

}
