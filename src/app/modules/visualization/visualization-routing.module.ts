import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VisualizationPageComponent } from '@app/modules/visualization/containers';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: VisualizationPageComponent,
        children: [],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class VisualizationRoutingModule {}
