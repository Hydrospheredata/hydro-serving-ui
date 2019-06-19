import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  MetricsComponent,
  DashboardComponent,
  GraphsComponent,
} from '@monitoring/containers';

export const routes: Routes = [
  {
    path: 'metrics',
    component: MetricsComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'graphs',
    component: GraphsComponent,
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonitoringRoutingModule {}
