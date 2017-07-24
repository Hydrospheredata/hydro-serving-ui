import {ModuleWithProviders}  from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SingleModelComponent} from '@components/models-wrapper/models-list/single-model/single-model.component';

import {ModelsWrapperComponent} from '@components/models-wrapper/models-wrapper.component';

// Route Configuration
export const routes: Routes = [
    {
      path: '',
      redirectTo: '/models',
      pathMatch: 'full'
    }, {
      path: 'models',
      component: ModelsWrapperComponent,
    }, {
      path: 'model/:modelId',
      pathMatch: 'prefix',
      component: SingleModelComponent
    }
  ]
;

export const HydroRouter: ModuleWithProviders = RouterModule.forRoot(routes);
