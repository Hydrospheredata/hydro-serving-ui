import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  ApplicationsPageComponent,
  ApplicationPageComponent,
} from './containers';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'applications',
        component: ApplicationsPageComponent,
      },
      {
        path: 'applications/:name',
        component: ApplicationPageComponent,
        data: { anim: 'appDetail' },
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ApplicationsRoutingModule {}
