import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelVersionLogService } from '@models/services/model-version-log.service';
import { MockModelVersion1Model1 } from '@testing/factories/modelVersion';
import { ModelVersionLogComponent } from './model-version-log.component';

const MockService = {
  getLog() {},
};

describe('ModelVersionLogComponent', () => {
  let component: ModelVersionLogComponent;
  let fixture: ComponentFixture<ModelVersionLogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelVersionLogComponent ],
      providers: [{
        provide: ModelVersionLogService, useValue: MockService,
      }],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelVersionLogComponent);
    component = fixture.componentInstance;
    component.modelVersion = MockModelVersion1Model1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
