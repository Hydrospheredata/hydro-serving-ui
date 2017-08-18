import { Component, OnInit, InjectionToken, Inject, HostListener } from '@angular/core';
import { MdlDialogReference } from '@angular-mdl/core';
import { MdlSnackbarService } from '@angular-mdl/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ModelStore } from '@stores/model.store';

export let injectableModelStopOptions = new InjectionToken<object>('injectableModelStopOptions');

@Component({
  selector: 'hydro-dialog-stop-model',
  templateUrl: './dialog-stop-model.component.html',
  styleUrls: ['./dialog-stop-model.component.scss'],
  providers: [],
})
export class DialogStopModelComponent implements OnInit {
  private data;
  public modelId;

  constructor(
    @Inject(injectableModelStopOptions) data,
    public dialogRef: MdlDialogReference,
    private fb: FormBuilder,
    private modelStore: ModelStore,
    private mdlSnackbarService: MdlSnackbarService
  ) {
    this.modelId = data;
  }

  ngOnInit() {
  }

  @HostListener('keydown.esc')
  public onEsc(): void {
    this.dialogRef.hide();
  }

  submitStopModelForm() {
    this.modelStore.stopModel(this.modelId)
      .finally(() => {
        this.modelStore.getAll();
      })
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
