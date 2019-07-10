import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
  ApplicationsWrapperComponent,
  ApplicationsItemDetailComponent,
} from '@applications/components';
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
                path: ':name',
                component: ApplicationsItemDetailComponent,
                data: { anim: 'appDetail' },
              },
            ],
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ApplicationsRoutingModule {}
