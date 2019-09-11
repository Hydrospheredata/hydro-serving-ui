import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogService } from '@dialog/dialog.service';
import { MonitoringPageFacade } from '@monitoring/store/facades';
import { SharedModule } from '@shared/shared.module';
import {
  AggregationComponent,
  RequestsInformationComponent,
  LogComponent,
  CustomChecksComponent,
} from '@testing/components';
import { MonitoringPageComponent } from './monitoring-page.component';
describe('MonitoringPageComponent', () => {
  let component: MonitoringPageComponent;
  let fixture: ComponentFixture<MonitoringPageComponent>;
  let facade: {
    loadMetrics: () => {};
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MonitoringPageComponent,
        AggregationComponent,
        RequestsInformationComponent,
        LogComponent,
        CustomChecksComponent,
      ],
      imports: [SharedModule],
      providers: [
        DialogService,
        {
          provide: MonitoringPageFacade,
          useValue: {
            loadMetrics: () => {},
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoringPageComponent);
    component = fixture.componentInstance;
    facade = TestBed.get(MonitoringPageFacade);
    spyOn(facade, 'loadMetrics');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('called loadMetrics function on init', () => {
    expect(facade.loadMetrics).toHaveBeenCalled();
    expect(facade.loadMetrics).toHaveBeenCalledTimes(1);
  });
});
