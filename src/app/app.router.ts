import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModelsWrapperComponent } from '@components/models-wrapper/models-wrapper.component';

// Route Configuration
export const routes: Routes = [
  {
    path: '',
    redirectTo: '/models',
    pathMatch: 'full'
  },
  {
    path: 'models',
    component: ModelsWrapperComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
