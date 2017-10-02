import { Component, OnInit, Input, Output , EventEmitter} from '@angular/core';
import { MdlDialogService } from '@angular-mdl/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Service, Model } from '@shared/models/_index';

import { Store } from '@ngrx/store';
import { AppState } from '@shared/models/_index';

import { 
    DialogAddServiceComponent
} from '@components/dialogs/_index';



@Component({
  selector: 'hydro-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    private sidebarList: any[];
    private title: string = '';

    @Input() isAddBtnEnabled: boolean;
    @Input() dataType: string;


    constructor(
        private store: Store<AppState>,
        private dialog: MdlDialogService
    ) {}

    ngOnInit() {
        this.title = this.dataType;
        // ToDo
        // Fix dynamic select from store
        if (this.dataType === 'services') {
            this.store.select("services")
                .subscribe(items => {
                    this.sidebarList = items;
                });
        } else {
            this.store.select("models")
                .subscribe(items => {
                    this.sidebarList = items;
                });
        }
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

}
