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
        children: [
          {
            path: ':name',
            component: ApplicationPageComponent,
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ApplicationsRoutingModule {}
