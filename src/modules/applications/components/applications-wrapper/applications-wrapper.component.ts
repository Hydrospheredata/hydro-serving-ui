import { trigger, transition, animate, style, query, group } from '@angular/animations';
import { Component, OnDestroy } from '@angular/core';

import * as fromApplications from '@applications/reducers';
import * as fromModels from '@models/reducers';
import { Store } from '@ngrx/store';

import { DialogModelsEmptyComponent } from '@shared/components/dialogs';
import { Application, Model } from '@shared/models/_index';

import { DialogService } from '@dialog/dialog.service';
import { Subscription, Observable } from 'rxjs';

import { RouterOutlet } from '@angular/router';
import { DialogAddApplicationComponent } from '@applications/components/dialogs';

@Component({
    selector: 'hs-applications-wrapper',
    templateUrl: './applications-wrapper.component.html',
    styleUrls: ['./applications-wrapper.component.scss'],
    animations: [
        trigger('anim', [
            transition('appDetail => appStageDetail', [
                style({
                    position: 'relative',
                }),
                query(':leave, :enter', [
                    style({
                        position: 'absolute',
                        width: '100%',
                        top: 0,
                        left: 0,
                    }),
                ]),
                query(':enter', [
                   style({left: '100%'}),
                ]),
                group([
                    query(':leave', animate('300ms', style({left: '-100%'}))),
                    query(':enter', [
                        animate('300ms', style({left: '0px'})),
                    ]),
                ]),
            ]),
            transition('appStageDetail => appDetail', [
                style({
                    position: 'relative',
                }),
                query(':leave, :enter', [
                    style({
                        position: 'absolute',
                        width: '100%',
                        top: 0,
                        left: 0,
                    }),
                ]),
                query(':enter', [
                   style({left: '-100%'}),
                ]),
                group([
                    query(':leave',  animate('300ms', style({left: '100%'}))),
                    query(' :enter', [
                        animate('300ms', style({left: '0px'})),
                    ]),
                ]),
            ]),
        ]),
    ],
})
export class ApplicationsWrapperComponent implements OnDestroy {
    public sidebarTitle = 'Applications';
    public applications: Observable<Application[]>;
    private someModelIsFinished: boolean = false;
    private modelsSub: Subscription;

    constructor(
        private storeApp: Store<fromApplications.State>,
        private storeModels: Store<fromModels.State>,
        private dialog: DialogService
    ) {
        this.applications = this.storeApp.select(fromApplications.getAllApplications);
        this.modelsSub = this.storeModels.select(fromModels.getAllModels).subscribe(
            models => {
                this.someModelIsFinished = models.some(this.lastModelVersionExist);
            }
        );
    }

    public addApplication(): void {
        this.someModelIsFinished ? this.showAddApplicationDialog() : this.showAlert();
    }

    prepare(outlet: RouterOutlet) {
        return outlet.activatedRouteData && outlet.activatedRouteData.anim;
    }

    ngOnDestroy(): void {
        this.modelsSub.unsubscribe();
    }

    private lastModelVersionExist({ lastModelVersion }: Model): boolean {
        return !!lastModelVersion;
    }

    private showAlert(): void {
        this.dialog.createDialog({component: DialogModelsEmptyComponent});
    }

    private showAddApplicationDialog(): void {
        this.dialog.createDialog({
            component: DialogAddApplicationComponent,
            styles: { height: '100%' },
        });
    }
}
