import { Component, OnInit, Input, Output , EventEmitter, OnChanges} from '@angular/core';
import { MdlDialogService } from '@angular-mdl/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Store } from '@ngrx/store';

import { AppState } from '@shared/models/_index';
import { Service, Model } from '@shared/models/_index';
import { Observable } from 'rxjs/Observable';

import { DialogAddServiceComponent } from '@components/dialogs/_index';
import * as moment from 'moment';



@Component({
  selector: 'hydro-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnChanges {

    private sidebarList: any[]; // ToDo: Fix any type
    private title: string = '';

    @Input() isAddBtnEnabled: boolean;
    @Input() isModels: boolean;
    @Input() sidebarTitle: string;

    @Input() sidebarData: Observable<any>; // ToDo: Fix any type


    constructor(
        private store: Store<AppState>,
        private dialog: MdlDialogService
    ) {}

    ngOnInit() {
    }

    ngOnChanges() {
        this.sidebarData.subscribe(items => {
            if (items.length) {
                this.sidebarList = items;
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
