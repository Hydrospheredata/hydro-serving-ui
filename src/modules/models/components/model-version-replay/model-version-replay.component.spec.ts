import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlSelectModule } from '@angular-mdl/select';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpService } from '@core/services/http';
import { reducers } from '@models/reducers';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';
import { ModelVersionReplayComponent } from './model-version-replay.component';

describe('ModelVersionReplyComponent', () => {
  let component: ModelVersionReplayComponent;
  let fixture: ComponentFixture<ModelVersionReplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModelVersionReplayComponent],
      imports: [
        SharedModule,
        MdlSelectModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('models', reducers),
        HttpClientTestingModule,
      ],
      providers: [HttpService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelVersionReplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
