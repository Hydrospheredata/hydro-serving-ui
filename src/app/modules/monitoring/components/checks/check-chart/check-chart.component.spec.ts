import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '@app/shared/shared.module';
import { HsD3Module } from '@app/modules/hs-d3/hs-d3.module';
import { CheckChartComponent } from './check-chart.component';
import { mockChartConfig } from '../../../mocks';
import { MonitoringPageService } from '../../../containers/monitoring-page/monitoring-page.service';

describe('CheckChartComponent', () => {
  let component: CheckChartComponent;
  let fixture: ComponentFixture<CheckChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CheckChartComponent],
      imports: [SharedModule, HsD3Module],
      providers: [{ provide: MonitoringPageService, useValue: {} }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckChartComponent);
    component = fixture.componentInstance;
    component.config = mockChartConfig;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
