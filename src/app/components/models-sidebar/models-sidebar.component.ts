import { Component, OnInit } from '@angular/core';
import { ModelStore } from '@stores/model.store';
import { Model } from '@models/model';
import { MdlDialogService } from '@angular-mdl/core';
import { DialogTestComponent, injectableModelBuildOptions } from '@components/dialogs/dialog-test/dialog-test.component';

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
  ) {
    this.models = [];
    this.modelServices = [];
  }

  ngOnInit() {
    this.modelStore.getAll();
    this.modelStore.items
      .subscribe((items) => {
        this.models = items;
      });
  }

}
