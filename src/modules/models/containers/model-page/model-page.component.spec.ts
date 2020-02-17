import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModelsFacade } from '@models/store';
import { SharedModule } from '@shared/shared.module';
import { ModelVersionsComponent } from '@testing/components';
import { ModelPageComponent } from './model-page.component';

const modelsFacade: Partial<ModelsFacade> = {};

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
