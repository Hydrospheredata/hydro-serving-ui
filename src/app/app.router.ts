import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SingleModelComponent } from '@components/models-wrapper/models-list/single-model/single-model.component';

import { ModelsWrapperComponent } from '@components/models-wrapper/models-wrapper.component';
import { ModelsListComponent } from '@components/models-wrapper/models-list/models-list.component';
import { ModelDetailsComponent } from '@components/model-details/model-details.component';

// Route Configuration
export const routes: Routes = [
    {
      path: '',
      redirectTo: '/models/all',
      pathMatch: 'full'
    }, {
    path: 'models',
    component: ModelsWrapperComponent,
    children: [{
      path: ':modelId',
      pathMatch: 'prefix',
      component: ModelDetailsComponent
    }]
  }]
;

export const HydroRouter: ModuleWithProviders = RouterModule.forRoot(routes);
