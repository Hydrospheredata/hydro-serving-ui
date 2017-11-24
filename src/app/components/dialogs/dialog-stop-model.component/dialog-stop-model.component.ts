import { Component, OnInit, InjectionToken, Inject, HostListener } from '@angular/core';
import { MdlDialogReference, MdlSnackbarService } from '@angular-mdl/core';

import { AppState } from '@shared/models/_index';
import { HttpModelServiceService } from '@shared/services/_index';

import { Store } from '@ngrx/store';
import * as Actions from '@shared/actions/_index';

export let injectableModelStopOptions = new InjectionToken<object>('injectableModelStopOptions');

@Component({
    selector: 'hydro-dialog-stop-model',
    templateUrl: './dialog-stop-model.component.html',
    styleUrls: ['./dialog-stop-model.component.scss'],
    providers: [],
    })
export class DialogStopModelComponent implements OnInit {
  public model;
  public hasWeightedServices: boolean;

  constructor(
  @Inject(injectableModelStopOptions) data,
    public dialogRef: MdlDialogReference,
    private mdlSnackbarService: MdlSnackbarService,
    private modelServiceService: HttpModelServiceService,
    private store: Store<AppState>
  ) {
      this.model = data.model;
      this.hasWeightedServices = data.hasWeightedServices;
  }

  ngOnInit() {
  }

  @HostListener('document:keydown.escape')
  public onEsc(): void {
      this.dialogRef.hide();
  }

  submitStopModelForm() {
      const id = this.model.serviceId;
      this.modelServiceService.removeService(id)
          .subscribe(() => {
              this.dialogRef.hide();
              this.mdlSnackbarService.showSnackbar({
                  message: 'Model has been stopped',
                  timeout: 5000
              });
              this.store.dispatch({ type: Actions.SWITCH_MODEL, payload: this.model.modelRuntime.modelId });
          },
          (error) => {
              this.mdlSnackbarService.showSnackbar({
                  message: error,
                  timeout: 5000
              });
          });
  }
}
