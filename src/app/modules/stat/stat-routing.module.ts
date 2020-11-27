import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StatPageComponent } from '@app/modules/stat/containers';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: StatPageComponent,
        children: [],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class StatRoutingModule {}
