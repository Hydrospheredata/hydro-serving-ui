import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { MdlDialogService } from '@angular-mdl/core';
import { Router, NavigationEnd } from '@angular/router';
// import { SortByPipe } from '@shared/pipes/sort-by.pipe';
import { Subscription } from 'rxjs/Subscription';

import { Service, Model } from '@shared/models/_index';
import { Observable } from 'rxjs/Observable';

import { DialogAddServiceComponent } from '@components/dialogs/_index';
import * as moment from 'moment';



@Component({
    selector: 'hydro-sidebar',
    templateUrl: './sidebar.component.html',
    // providers: [SortByPipe],
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnChanges, OnDestroy {

  public sidebarList: Service[] | Model[] = [];
  public searchQ: string;
  private needsToGo = false;
  public sidebarFilter = {'deployed': true, 'undeployed': true, 'apps': true, 'pipelines': true};
  @Input() isAddBtnEnabled: boolean;
  @Input() isModels: boolean;
  @Input() sidebarTitle: string;

  @Input() sidebarData: Observable<any>; // ToDo: Fix any type
  private routeSubscription: Subscription;

  constructor(
    // private sortByPipe: SortByPipe,
    // private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MdlDialogService
  ) {
      this.routeSubscription = this.router.events
          .subscribe(event => {
              if (event instanceof NavigationEnd && event.url.split('/').length <= 2) {
                  this.needsToGo = true;
                  // this.transitToFirstItem();
              }
          });
  }

  ngOnInit() {
  }

  ngOnChanges() {
      this.sidebarData.subscribe(items => {
        console.log(items);
          this.sidebarList = items;
          // this.transitToFirstItem();
      });
  }

  // private transitToFirstItem() {
  //     if (this.needsToGo && this.sidebarList.length > 0) {
  //         this.needsToGo = false;
  //         const sorted = this.sortByPipe.transform(this.sidebarList, 'id');
  //         this.router.navigate([sorted[0].id], { relativeTo: this.activatedRoute });
  //     }
  // }

  ngOnDestroy() {
      this.routeSubscription.unsubscribe();
  }


  addService() {
      this.dialog.showCustomDialog({
          component: DialogAddServiceComponent,
          styles: { 'width': '850px', 'min-height': '250px', 'max-height': '90vh', 'overflow': 'auto' },
          classes: '',
          isModal: true,
          clickOutsideToClose: true,
          enterTransitionDuration: 400,
          leaveTransitionDuration: 400
      });
  }

  public getLatestVersion(item) {
      // console.log(item.lastModelRuntime);
      if (!item.lastModelRuntime) {
          return '0.0.1';
      }
      // if (item.lastModelRuntime && this.isDeployable(item)) {
      //     return `0.0.${Number(item.lastModelRuntime.modelVersion.split('.')[2]) + 1}`;
      // }
      return item.lastModelRuntime.modelVersion;

      // return '0.0.1';

  }

  toggleSidebarFilter(option) {
      this.sidebarFilter[option] = !this.sidebarFilter[option];
  }

  public isDeployable(model: Model) {
      if (!model || !model.model.created) {
          return true;
      }
      const modelUpdated = model.model.updated;
      const runtimeCreated = model.model.created;
      return moment(modelUpdated).isAfter(moment(runtimeCreated));
  }

}
