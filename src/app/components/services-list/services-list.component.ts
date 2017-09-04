import { Component, OnInit } from '@angular/core';
import { WeightedServiceStore } from '@stores/weighted-service.store';
import { WeightedService } from '@models/weighted-service';
import { MdlDialogService } from '@angular-mdl/core';
import { DialogWeightedServiceComponent, injectableWeightedService } from '@components/dialogs/dialog-weighted-service/dialog-weighted-service.component';
import { DialogTestComponent, injectableModelBuildOptions } from '@components/dialogs/dialog-test/dialog-test.component';

@Component({
  selector: 'hydro-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss']
})
export class ServicesListComponent implements OnInit {
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
