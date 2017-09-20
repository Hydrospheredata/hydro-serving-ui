import { Component, OnInit } from '@angular/core';
import { ModelStore } from '@shared/stores/_index';
import { MdlDialogService } from '@angular-mdl/core';
import { DialogTestComponent, injectableModelBuildOptions } from '@components/dialogs/dialog-test/dialog-test.component';
import { ModelsService, Model } from '@shared/_index';
import { Store } from '@ngrx/store';
import { AppState } from '@shared/models/_index';
@Component({
  selector: 'hydro-models-sidebar',
  templateUrl: './models-sidebar.component.html',
  styleUrls: ['./models-sidebar.component.scss']
})
export class ModelsSidebarComponent implements OnInit {
  public searchQ: string;
  public models: Model[];
  public activeService;
  public modelServices;

  constructor(
    private dialog: MdlDialogService,
    private modelStore: ModelStore,
    private store: Store<AppState>,
  ) {
    this.models = [];
    this.modelServices = [];
  }

  ngOnInit() {
    this.store.select('models')
    .subscribe(models => {
        this.models = models;
    });
  }

}
