import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { MonitoringPageComponent } from './containers';
import { reducer } from './reducers';

@NgModule({
  declarations: [MonitoringPageComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('monitoring', reducer),
  ],
})
export class MonitoringModule { }
