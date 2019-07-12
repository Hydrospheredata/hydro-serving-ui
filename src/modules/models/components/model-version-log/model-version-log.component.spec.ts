import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelVersionLogService } from '@models/services/model-version-log.service';
import { SharedModule } from '@shared/shared.module';
import { MockModelVersion1Model1 } from '@testing/factories/modelVersion';
import { of } from 'rxjs';
import { ModelVersionLogComponent } from './model-version-log.component';

const MockService = {
  getLog() { return of([]); },
};

describe('ModelVersionLogComponent', () => {
  let component: ModelVersionLogComponent;
  let fixture: ComponentFixture<ModelVersionLogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelVersionLogComponent ],
      imports: [SharedModule],
      providers: [{
        provide: ModelVersionLogService, useValue: MockService,
      }],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelVersionLogComponent);
    component = fixture.componentInstance;
    component.modelVersion = MockModelVersion1Model1.id;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
