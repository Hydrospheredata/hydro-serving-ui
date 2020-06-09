import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CanActivateApplicationGuard } from '@applications/guards/can-activate-application.guard';
import { ApplicationsPageComponent, ApplicationPageComponent } from './containers';

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
            canActivate: [CanActivateApplicationGuard],
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ApplicationsRoutingModule {}
