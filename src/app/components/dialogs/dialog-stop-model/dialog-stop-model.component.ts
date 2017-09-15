import { Component, OnInit, InjectionToken, Inject, HostListener } from '@angular/core';
import { MdlDialogReference } from '@angular-mdl/core';
import { MdlSnackbarService } from '@angular-mdl/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ModelStore } from '@stores/model.store';
import { ModelServiceStore } from '@shared/stores/model-service.store';
import { Model } from '@models/model';

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
    private mdlSnackbarService: MdlSnackbarService
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
    let apiUrl;
    let id;
    if (this.model instanceof Model) {
      id = this.model.id;
      apiUrl = this.modelStore.stopModel.bind(this.modelStore);
    } else {
      id = this.model.serviceId;
      apiUrl = this.modelServiceStore.serve.bind(this.modelServiceStore);
    }


    this.modelStore.stopModel(this.model)
      .subscribe(result => {
        this.dialogRef.hide();
        this.mdlSnackbarService.showSnackbar({
          message: 'Model has been stopped',
          timeout: 5000
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
