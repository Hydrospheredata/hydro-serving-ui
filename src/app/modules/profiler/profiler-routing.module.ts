import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProfilerPageComponent } from './pages';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ProfilerPageComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ProfilerRoutingModule {}
