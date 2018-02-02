import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { MdlDialogService } from '@angular-mdl/core';
// import { Router, NavigationEnd } from '@angular/router';
// import { SortByPipe } from '@shared/pipes/sort-by.pipe';
import { Subscription } from 'rxjs/Subscription';

import { Application, Model } from '@shared/models/_index';
import { Observable } from 'rxjs/Observable';

import { DialogAddServiceComponent } from '@components/dialogs/_index';
// import * as moment from 'moment';
// import { Store } from '@ngrx/store';




@Component({
    selector: 'hydro-sidebar',
    templateUrl: './sidebar.component.html',
    // providers: [SortByPipe],
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnChanges, OnDestroy {

    public sidebarList: Application[] | Model[] = [];
    public searchQ: string;
    // private needsToGo = false;
    public sidebarFilter = {'deployed': true, 'undeployed': true, 'apps': true, 'pipelines': true};
    @Input() isAddBtnEnabled: boolean;
    @Input() isModels: boolean;
    @Input() sidebarTitle: string;

    @Input() sidebarData: Observable<any>; // ToDo: Fix any type
    // private routeSubscription: Subscription;
    private sidebarDataSub: Subscription;
    // private buildsListSub: Subscription;

    public buildsList: any;

    // private dataStreams: any[] = [];

    constructor(
        // private sortByPipe: SortByPipe,
        // private activatedRoute: ActivatedRoute,
        // private router: Router,
        private dialog: MdlDialogService,
        // private store: Store<AppState>,
    ) {
        // this.routeSubscription = this.router.events
        //     .subscribe(event => {
        //         if (event instanceof NavigationEnd && event.url.split('/').length <= 2) {
        //             this.needsToGo = true;
        //             this.transitToFirstItem();
        //         }
        //     });
    }

    ngOnInit() {
        // console.log(this.store.select('builds'));
        this.sidebarDataSub = this.sidebarData
            .subscribe(items => {
                console.log(items);
                this.sidebarList = items;
                // this.transitToFirstItem();
            });
    }

    ngOnChanges() {
        // this.buildsListSub = this.store.select('builds')
        //     .skip(1)
        //     .subscribe(builds => {
        //         console.log(builds)
        //         this.buildsList = builds;
        //     })
        // this.sidebarDataSub = this.sidebarData
        //     .skip(1)
        //     .subscribe(items => {
        //         this.sidebarList = items;
        //         // this.transitToFirstItem();
        //     });
    }

    // private transitToFirstItem() {
    //     if (this.needsToGo && this.sidebarList.length > 0) {
    //         this.needsToGo = false;
    //         const sorted = this.sortByPipe.transform(this.sidebarList, 'id');
    //         this.router.navigate([sorted[0].id], { relativeTo: this.activatedRoute });
    //     }
    // }

    ngOnDestroy() {
        if (this.sidebarDataSub) {
            this.sidebarDataSub.unsubscribe();
        }
        // this.routeSubscription.unsubscribe();
    }


    public addService() {
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

}
