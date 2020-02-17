import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModelsFacade } from '@models/store';
import { ModelVersionDetailsComponent } from '@testing/components';
import { ModelVersionPageComponent } from './model-version-page.component';

const modelsFacade: Partial<ModelsFacade> = {};

describe('ModelVersionPageComponent', () => {
  let component: ModelVersionPageComponent;
  let fixture: ComponentFixture<ModelVersionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModelVersionPageComponent, ModelVersionDetailsComponent],
      providers: [{ provide: ModelsFacade, useValue: modelsFacade }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelVersionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
