import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hydro-models-list',
  templateUrl: './models-list.component.html',
  styleUrls: ['./models-list.component.scss']
})
export class ModelsListComponent implements OnInit {
  public searchQ: string;
  public services: WeightedService[];
  public activeService;
  public weightedServices: WeightedService[];
  public modelServices;

  constructor(
    private dialog: MdlDialogService,
    private weightedServiceStore: WeightedServiceStore,
  ) {
    this.services = [];
    this.modelServices = [];
  }

  ngOnInit() {
    this.weightedServiceStore.getAll();
    this.weightedServiceStore.items
      .subscribe((items) => {
        this.weightedServices = items;
      });
  }

  openDialogWeightedServicesForm(service?: WeightedService) {
    this.dialog.showCustomDialog({
      component: DialogWeightedServiceComponent,
      styles: {'width': '850px', 'min-height': '250px'},
      classes: '',
      isModal: true,
      clickOutsideToClose: true,
      enterTransitionDuration: 400,
      leaveTransitionDuration: 400,
      providers: [{provide: injectableWeightedService, useValue: service}],
    });
  }

  openDialogTestWeightedServicesForm(service?: WeightedService) {
    console.log(service);
    this.dialog.showCustomDialog({
      component: DialogTestComponent,
      styles: {'width': '850px', 'min-height': '250px'},
      classes: '',
      isModal: true,
      clickOutsideToClose: true,
      enterTransitionDuration: 400,
      leaveTransitionDuration: 400,
      providers: [{provide: injectableModelBuildOptions, useValue: service}],
    });
  }

}
