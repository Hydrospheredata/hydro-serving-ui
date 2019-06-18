import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { MonitoringService } from '@core/services/metrics/monitoring.service';
import { ReqstoreService } from '@core/services/reqstore.service';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';
import {
  HealthTimelineComponent,
  ChartsComponent,
  MockReqstoreTableLogComponent,
} from '@testing/components';
import { DashboardComponent } from './dashboard.component';

const MockMonitoring = {};
const MockReqstore = {};

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        HealthTimelineComponent,
        MockReqstoreTableLogComponent,
        ChartsComponent,
      ],
      imports: [StoreModule.forRoot({}), SharedModule, FormsModule],
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
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
