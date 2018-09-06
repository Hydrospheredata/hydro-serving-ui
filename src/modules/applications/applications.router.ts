import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ApplicationsWrapperComponent, ApplicationsItemDetailComponent, ApplicationsStageDetailComponent } from '@applications/components';
import { ApplicationsGuard } from '@applications/services';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'applications',
                component: ApplicationsWrapperComponent,
                children: [
                    {
                        path: '',
                        canActivateChild: [ApplicationsGuard],
                        children: [
                            {
                                path: ':id',
                                component: ApplicationsItemDetailComponent,
                            },
                            {
                                path: ':id/:stageId',
                                component: ApplicationsStageDetailComponent
                            }
                        ]
                    }
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class ApplicationsRoutingModule { }
