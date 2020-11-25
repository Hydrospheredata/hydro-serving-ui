import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApplicationDetailsComponent } from '@app/modules/applications/containers/application-details/application-details.component';
import { ApplicationsPageComponent } from './pages/applications-page/applications-page.component';
import { CanActivateApplicationGuard } from './guards/can-activate-application.guard';
@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ApplicationsPageComponent,
        children: [
          {
            path: ':name',
            component: ApplicationDetailsComponent,
            canActivate: [CanActivateApplicationGuard],
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ApplicationsRoutingModule {}
