import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MonitoringPageComponent } from '@app/modules/monitoring/containers';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: MonitoringPageComponent,
        children: [],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class MonitoringRoutingModule {}
