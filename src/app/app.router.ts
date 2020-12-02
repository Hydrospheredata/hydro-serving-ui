import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'models',
    loadChildren: () => import('./modules/models/models.module').then(m => m.ModelsModule),
  },
  {
    path: 'applications',
    loadChildren:
      () => import('./modules/applications/applications.module').then(m => m.ApplicationsModule),
  },
  {
    path: 'deployment_configs',
    loadChildren:
      () => import('./modules/deployment-configs/deployment-configs.module').then(m => m.DeploymentConfigsModule),
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
