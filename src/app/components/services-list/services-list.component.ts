import { Component, OnInit } from '@angular/core';
import { WeightedServiceStore } from '@stores/weighted-service.store';
import { WeightedService } from '@models/weighted-service';
import { MdlDialogService } from '@angular-mdl/core';
import { DialogWeightedServiceComponent, injectableWeightedService } from '@components/dialogs/dialog-weighted-service/dialog-weighted-service.component';
import { Router, RoutesRecognized, ActivatedRoute } from '@angular/router';

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

  constructor(
    private dialog: MdlDialogService,
    private weightedServiceStore: WeightedServiceStore,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.services = [];
  }

  ngOnInit() {
    this.router.events.subscribe(val => {
      if (val instanceof RoutesRecognized) {
        // console.log(val);
      }
    });

    this.activatedRoute.parent.params.subscribe(params => {
      console.log(params);
    });

    this.weightedServiceStore.getAll();
    this.weightedServiceStore.items.subscribe((services) => {
        this.services = services;
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

}
