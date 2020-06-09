import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModelsFacade } from '@models/store';
import { Observable, of } from '@node_modules/rxjs';
import { Model, ModelVersion } from '@shared/models';
import { SharedModule } from '@shared/shared.module';
import { ModelVersionsComponent } from '@testing/components';
import { MockModel1 } from '@testing/factories/model';
import { MockModelVersion1Model1 } from '@testing/factories/modelVersion';
import { ModelPageComponent } from './model-page.component';

const modelsFacade: Partial<ModelsFacade> = {
  getSelectedModel(): Observable<Model> {
    return of(MockModel1);
  },
  getSelectedModelVersions(): Observable<ModelVersion[]> {
    return of([MockModelVersion1Model1]);
  },
};

describe('ModelPageComponent', () => {
  let component: ModelPageComponent;
  let fixture: ComponentFixture<ModelPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ModelPageComponent, ModelVersionsComponent],
      providers: [{ provide: ModelsFacade, useValue: modelsFacade }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
