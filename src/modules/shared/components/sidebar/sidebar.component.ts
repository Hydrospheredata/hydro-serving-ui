import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { MdlDialogService } from '@angular-mdl/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { SortByPipe } from '@shared/pipes/sort-by.pipe';

import { AppState } from '@shared/models/_index';
import { Service, Model } from '@shared/models/_index';
import { Observable } from 'rxjs/Observable';

import { DialogAddServiceComponent } from '@components/dialogs/_index';
import * as moment from 'moment';



@Component({
  selector: 'hydro-sidebar',
  templateUrl: './sidebar.component.html',
  providers: [SortByPipe],
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnChanges {

  public sidebarList: Service[] | Model[];
  private title = '';
  public searchQ: string;
  private needsToGo = false;

  @Input() isAddBtnEnabled: boolean;
  @Input() isModels: boolean;
  @Input() sidebarTitle: string;

  @Input() sidebarData: Observable<any>; // ToDo: Fix any type


  constructor(
    private sortByPipe: SortByPipe,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private dialog: MdlDialogService
  ) { }

  ngOnInit() {
    // this.activatedRoute.url.subscribe(params => {
    //   if (this.sidebarList.length > 0) {
    //     const sorted = this.sortByPipe.transform(this.sidebarList, 'id');
    //     // EXTREMELY AWFUL HACK DO NOT TRY THIS AT HOME I REPEAT DO NOT TRY THIS AT HOME!!!!
    //     if (this.router.url.split('/').length <= 2) {
    //       this.router.navigate([sorted[0].id], { relativeTo: this.activatedRoute });
    //     }
    //   } else {
    //     this.needsToGo = true;
    //   }
    // });
  }

  ngOnChanges() {
    this.sidebarData.subscribe(items => {
      this.sidebarList = items;
      // if (this.needsToGo) {
      //   this.needsToGo = false;
      //   if (this.sidebarList.length > 0) {
      //     const sorted = this.sortByPipe.transform(this.sidebarList, 'id');
      //     // EXTREMELY AWFUL HACK DO NOT TRY THIS AT HOME I REPEAT DO NOT TRY THIS AT HOME!!!!
      //     if (this.router.url.split('/').length <= 2) {
      //       this.router.navigate([sorted[0].id], { relativeTo: this.activatedRoute });
      //     }
      //   }
      // }
    });
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
    if (!item.lastModelRuntime.id) {
      return '0.0.1';
    }
    if (this.isDeployable(item)) {
      return `0.0.${Number(item.lastModelRuntime.modelVersion.split('.')[2]) + 1}`;
    }
    return item.lastModelRuntime.modelVersion;

  }

  public isDeployable(model) {
    if (!model || !model.lastModelRuntime.created) {
      return true;
    }
    const modelUpdated = model.updated;
    const runtimeCreated = model.lastModelRuntime.created;
    return moment(modelUpdated).isAfter(moment(runtimeCreated));
  }

}
