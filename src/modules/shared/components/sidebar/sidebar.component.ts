import { Component, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { SortByPipe } from '@shared/pipes/_index';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { Application, Model, Source } from '@shared/models/_index';

@Component({
    selector: 'hydro-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    providers: [SortByPipe]
})
export class SidebarComponent implements OnInit, OnDestroy {
    @Input() actionButton: TemplateRef<any>;
    @Input() isFilterEnabled = false;
    @Input() isModels: boolean;
    @Input() sidebarTitle: string;
    @Input() sidebarData: Observable<Application[] | Model[] | Source[]>;

    public sidebarList: Application[] | Model[] | Source[] = [];
    public sidebarFiltredList: Application[] | Model[] | Source[] = [];

    private isRedirectable = false;
    private routeSub: Subscription;
    private sidebarDataSub: Subscription;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
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
                this.sidebarList = this.sidebarFiltredList = this.sortBy.transform(items, 'id');
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


    private redirectToFirst() {
        if (this.isRedirectable && this.sidebarList.length > 0) {
            this.isRedirectable = false;
            this.router.navigate([this.sidebarList[0].id], { relativeTo: this.activatedRoute });
        }
    }

    onFilter(filtredItems: Application[] | Model[]): void {
        this.sidebarFiltredList = filtredItems;
    }
}
