import { Component, OnInit, InjectionToken, Inject, HostListener } from '@angular/core';
import { MdlDialogReference, MdlSnackbarService } from '@angular-mdl/core';

import { HttpModelServiceService } from '@shared/services/_index';

import { Store } from '@ngrx/store';
import { AppState } from '@shared/models/_index';
import * as Actions from '@shared/actions/_index';
export let injectableModelDeployOptions = new InjectionToken<object>('injectableModelDeployOptions');

@Component({
    selector: 'hydro-dialog-deploy-model',
    templateUrl: './dialog-deploy-model.component.html',
    styleUrls: ['./dialog-deploy-model.component.scss'],
    providers: [],
    })
export class DialogDeployModelComponent implements OnInit {
  public model;

  constructor(
  @Inject(injectableModelDeployOptions) data,
    public dialogRef: MdlDialogReference,
    private mdlSnackbarService: MdlSnackbarService,
    private modelServiceService: HttpModelServiceService,
    private store: Store<AppState>
  ) {
      this.model = data;
  }

  ngOnInit() {
  }

  @HostListener('document:keydown.escape')
  public onEsc(): void {
      this.dialogRef.hide();
  }

  submitDeployModelForm() {
      this.modelServiceService.createService(`${this.model.modelName}_${this.model.modelVersion}`, this.model.id)
          .subscribe(() => {
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
