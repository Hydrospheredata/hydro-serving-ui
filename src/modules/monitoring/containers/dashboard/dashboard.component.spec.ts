import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringService } from '@core/services/metrics/monitoring.service';
import { ReqstoreService } from '@core/services/reqstore.service';
import { StoreModule } from '@ngrx/store';
import {
  HealthTimelineComponent,
  ChartsComponent,
  ReqstoreTableLogComponent,
} from '@testing/components';
import { DashboardComponent } from './dashboard.component';

const MockMonitoring = {};
const MockReqstore = {};

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        HealthTimelineComponent,
        ReqstoreTableLogComponent,
        ChartsComponent,
      ],
      imports: [StoreModule.forRoot({})],
      providers: [
        {
          provide: MonitoringService,
          useValue: MockMonitoring,
        },
        {
          provide: ReqstoreService,
          useValue: MockReqstore,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
