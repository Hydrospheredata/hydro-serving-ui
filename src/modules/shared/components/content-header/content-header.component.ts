import { Component, OnInit, Input } from '@angular/core';
import { MdlDialogService } from '@angular-mdl/core';
import { Service } from '@shared/models/_index';

import { 
    DialogTestComponent, 
    DialogUpdateServiceComponent,
    DialogDeleteServiceComponent, 
    injectableServiceOptions,
    injectableModelBuildOptions, 
    injectableServiceUpdate 
} from '@components/dialogs/_index';



@Component({
  selector: 'hydro-content-header',
  templateUrl: './content-header.component.html',
  styleUrls: ['./content-header.component.scss']
})
export class ContentHeaderComponent implements OnInit {

    @Input() contentHeaderTitle: string;
    @Input() isActionsEnabled: boolean;
    @Input() service: Service;

    constructor(
        private dialog: MdlDialogService
    ) { }

    ngOnInit() {
    }

    testService(service: Service) {
        this.dialog.showCustomDialog({
            component: DialogTestComponent,
            styles: { 'width': '800px', 'min-height': '350px' },
            classes: '',
            isModal: true,
            clickOutsideToClose: true,
            enterTransitionDuration: 400,
            leaveTransitionDuration: 400,
            providers: [{ provide: injectableModelBuildOptions, useValue: service }],
        });
    }

    editService(service: Service) {
        this.dialog.showCustomDialog({
            component: DialogUpdateServiceComponent,
            styles: {'width': '850px', 'min-height': '250px'},
            classes: '',
            isModal: true,
            clickOutsideToClose: true,
            enterTransitionDuration: 400,
            leaveTransitionDuration: 400,
            providers: [{provide: injectableServiceUpdate, useValue: service}]
        });
    }

    removeService(id: string) {
        this.dialog.showCustomDialog({
            component: DialogDeleteServiceComponent,
            styles: {'width': '600px', 'min-height': '250px'},
            classes: '',
            isModal: true,
            clickOutsideToClose: true,
            enterTransitionDuration: 400,
            leaveTransitionDuration: 400,
            providers: [{provide: injectableServiceOptions, useValue: id}]
        });
    }

}
