import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogService } from '@dialog/dialog.service';
import {
  CheckChartComponent,
  ModelVersionsTagsComponent,
  RegimeSelectorComponent,
} from '@testing/components';
import { of } from 'rxjs';
import { CustomMetricsComponent } from './custom-metrics.component';
import { CustomMetricsFacade } from './custom-metrics.facade';
import { MonitoringPageService } from '@monitoring/store/facades';

const monitoringPageFacade: Partial<MonitoringPageService> = {};
describe('CustomMetricsComponent', () => {
  let component: CustomMetricsComponent;
  let fixture: ComponentFixture<CustomMetricsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CustomMetricsComponent,
        ModelVersionsTagsComponent,
        RegimeSelectorComponent,
        CheckChartComponent,
      ],
    })
      .overrideComponent(CustomMetricsComponent, {
        set: {
          providers: [
            {
              provide: MonitoringPageService,
              useValue: monitoringPageFacade,
            },
            {
              provide: CustomMetricsFacade,
              useValue: {
                getModelVersionsToCompare: () => of([]),
                getChartConfigs: () => of([]),
              },
            },
            { provide: DialogService, useValue: {} },
          ],
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
