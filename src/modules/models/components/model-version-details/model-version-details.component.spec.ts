import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlSelectModule } from '@angular-mdl/select';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SignaturesService } from '@core/services';
import { HttpService } from '@core/services/http';
import * as fromModels from '@models/reducers';
import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import {
  ProfilesComparisonHistogramComponent,
  ProfilesComponent,
  ProfileStatsComponent,
} from '@profiler/components';
import { SharedModule } from '@shared/shared.module';
import { ModelVersionLogComponent } from '@testing/components';
import { ServablesTableComponent } from '@testing/components/mock-servables-table.component';
import { MockModelVersion1Model1 } from '@testing/factories/modelVersion';
import { MomentModule } from 'angular2-moment';
import { of } from 'rxjs';
import { ModelVersionDetailsComponent } from './model-version-details.component';

describe('ModelVersionDetailsComponent', () => {
  let component: ModelVersionDetailsComponent;
  let fixture: ComponentFixture<ModelVersionDetailsComponent>;
  let store: MockStore<fromModels.State>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ModelVersionDetailsComponent,
        ModelVersionLogComponent,
        ServablesTableComponent,
      ],
      imports: [
        MdlSelectModule,
        SharedModule,
        RouterTestingModule,
        MomentModule,
        HttpClientTestingModule,
      ],
      providers: [SignaturesService, HttpService, provideMockStore()],
    }).compileComponents();
    store = TestBed.get(Store);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelVersionDetailsComponent);
    component = fixture.componentInstance;
    component.modelVersion$ = of(MockModelVersion1Model1);
    component.servables$ = of([]);
    fixture.detectChanges();
  });

  it('it should be created', () => {
    expect(component).toBeTruthy();
  });
});
