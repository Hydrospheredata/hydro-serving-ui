import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimemachineComponent } from './containers/timemachine/timemachine.component';

const routes: Routes = [
  {
    path: 'timemachine',
    component: TimemachineComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimemachineRoutingModule { }
