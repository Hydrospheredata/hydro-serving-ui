import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MdlDialogService } from '@angular-mdl/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { SortByPipe } from '@shared/pipes/_index';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { Application, Model, Source } from '@shared/models/_index';
import { DialogAddServiceComponent } from '@components/dialogs/_index';
// import * as moment from 'moment';




@Component({
    selector: 'hydro-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    providers: [ SortByPipe ]
})
export class SidebarComponent implements OnInit, OnDestroy {

    public sidebarList: Application[] | Model[] | Source[] = [];
    public searchQ: string;
    public sidebarFilter = {'deployed': true, 'undeployed': true, 'apps': true, 'pipelines': true};
    @Input() isActionBtnEnabled: boolean = false;
    @Input() isFilterEnabled: boolean = false;
    @Input() isModels: boolean;
    @Input() sidebarTitle: string;
    @Input() sidebarData: Observable<Application[] | Model[] | Source[]>;
    
    private isRedirectable: boolean = false;
    private routeSub: Subscription;
    private sidebarDataSub: Subscription;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private dialog: MdlDialogService,
        private sortBy: SortByPipe,
    ) {
        this.routeSub = this.router.events
            .subscribe(event => {
                if (event instanceof NavigationEnd && event.url.split('/').length <= 2) {
                    this.isRedirectable = true;
                    this.redirectToFirst();
                }
            });
    }

    ngOnInit() {
        this.sidebarDataSub = this.sidebarData
            .subscribe(items => {
                console.log('Sidebar data: ', items);
                this.sidebarList = this.sortBy.transform(items, 'id');
                if (this.sidebarList.length > 0) {
                    this.redirectToFirst();
                }
            });
    }

    ngOnDestroy() {
        if (this.sidebarDataSub) {
            this.sidebarDataSub.unsubscribe();
        }
        if (this.routeSub) {
            this.routeSub.unsubscribe();
        }
    }

    public addApplication() {
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

    public toggleSidebarFilter(option) {
        this.sidebarFilter[option] = !this.sidebarFilter[option];
    }

    private redirectToFirst() {
        if (this.isRedirectable && this.sidebarList.length > 0) {
            this.isRedirectable = false;
            this.router.navigate([this.sidebarList[0].id], { relativeTo: this.activatedRoute });
        }
    }

}
