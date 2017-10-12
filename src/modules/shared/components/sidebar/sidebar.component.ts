import { Component, OnInit, Input, Output , EventEmitter, OnChanges} from '@angular/core';
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
  providers: [ SortByPipe ],
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
    ) {}

    ngOnInit() {
      this.activatedRoute.url.subscribe(params => {
        if (this.sidebarList.length > 0) {
          const sorted = this.sortByPipe.transform(this.sidebarList, 'id');
          this.router.navigate([sorted[0].id], {relativeTo: this.activatedRoute});
        } else {
          this.needsToGo = true;
        }
        // this.router.navigate([this.sidebarList[0].id]);
      });
    }

    ngOnChanges() {
        this.sidebarData.subscribe(items => {
            this.sidebarList = items;
            if (this.needsToGo) {
              this.needsToGo = false;
              if (this.sidebarList.length > 0) {
              const sorted = this.sortByPipe.transform(this.sidebarList, 'id');
              this.router.navigate([sorted[0].id], {relativeTo: this.activatedRoute});
              }
            }
        });
    }


    addService() {
        this.dialog.showCustomDialog({
            component: DialogAddServiceComponent,
            styles: {'width': '850px', 'min-height': '250px'},
            classes: '',
            isModal: true,
            clickOutsideToClose: true,
            enterTransitionDuration: 400,
            leaveTransitionDuration: 400
        });
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
