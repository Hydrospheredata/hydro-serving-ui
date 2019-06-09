import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlSelectModule } from '@angular-mdl/select';
import { ChartComponent } from '@monitoring/components/chart/chart.component';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';
import { HealthTimelineComponent } from '@testing/components';
import { HsD3Module } from '../../../hs-d3/hs-d3.module';
import { ChartsComponent } from './charts.component';

describe('ChartsComponent', () => {
  let component: ChartsComponent;
  let fixture: ComponentFixture<ChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ChartsComponent,
        ChartComponent,
        HealthTimelineComponent,
      ],
      imports: [StoreModule.forRoot({}), HsD3Module, MdlSelectModule, SharedModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
