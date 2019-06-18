import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlSelectModule } from '@angular-mdl/select';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { reducer } from '@core/reducers/monitoring.reducer';
import { HttpService } from '@core/services/http';
import { MetricSettingsService } from '@core/services/metrics/_index';
import { reducers } from '@models/reducers';
import { StoreModule, combineReducers, Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { SharedModule } from '@shared/shared.module';
import { ChartComponent } from '@testing/components';
import { GraphsComponent } from './graphs.component';

describe('GraphsComponent', () => {
  let component: GraphsComponent;
  let fixture: ComponentFixture<GraphsComponent>;
  let metricSettingService: MetricSettingsService;
  let store: MockStore<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraphsComponent, ChartComponent],
      imports: [
        StoreModule.forRoot({}),
        FormsModule,
        MdlSelectModule,
        SharedModule,
        HttpClientTestingModule,
      ],
      providers: [HttpService, MetricSettingsService, provideMockStore()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphsComponent);
    component = fixture.componentInstance;
    metricSettingService = fixture.debugElement.injector.get(
      MetricSettingsService
    );

    store = TestBed.get(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
