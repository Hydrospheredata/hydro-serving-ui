import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'models',
    loadChildren: './modules/models/models.module#ModelsModule',
  },
  {
    path: 'applications',
    loadChildren:
      './modules/applications/applications.module#ApplicationsModule',
  },
  {
    path: 'deployment_configs',
    loadChildren:
      './modules/deployment-configs/deployment-configs.module#DeploymentConfigsModule',
  },
  {
    path: '',
    redirectTo: 'models',
    pathMatch: 'full',
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
