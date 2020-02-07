import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@shared/shared.module';
import { MockModelVersion1Model1 } from '@testing/factories/modelVersion';
import { ModelVersionStatusComponent } from '..';
import { ModelVersionsRowComponent } from './model-versions-row.component';

describe('ModelVersionsRowComponent', () => {
  let component: ModelVersionsRowComponent;
  let fixture: ComponentFixture<ModelVersionsRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule],
      declarations: [ModelVersionsRowComponent, ModelVersionStatusComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelVersionsRowComponent);
    component = fixture.componentInstance;
    component.modelVersion = MockModelVersion1Model1,
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
