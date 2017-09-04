import { Component, OnInit, InjectionToken, Inject, HostListener } from '@angular/core';
import { MdlDialogReference } from '@angular-mdl/core';
import { MdlSnackbarService } from '@angular-mdl/core';
import { WeightedServiceStore } from '@stores/weighted-service.store';

export let injectableServiceOptions = new InjectionToken<object>('injectableServiceOptions');

@Component({
  selector: 'hydro-dialog-delete-service',
  templateUrl: './dialog-delete-service.component.html',
  styleUrls: ['./dialog-delete-service.component.scss']
})
export class DialogDeleteServiceComponent implements OnInit {
  private data;
  public modelId;

  constructor(
    @Inject(injectableServiceOptions) data,
    public dialogRef: MdlDialogReference,
    private weightedServiceStore: WeightedServiceStore,
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

  submitDeleteServiceForm() {
    this.weightedServiceStore.delete(this.modelId)
      .finally(() => {
        this.weightedServiceStore.getAll();
      })
      .subscribe(result => {
          this.dialogRef.hide();
          this.mdlSnackbarService.showSnackbar({
            message: 'Service has been deleted',
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
