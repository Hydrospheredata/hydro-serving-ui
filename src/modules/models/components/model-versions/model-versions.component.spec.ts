import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@node_modules/@angular/router/testing';
import { ModelVersionsRowComponent } from '@testing/components';
import { ModelVersionsComponent } from './model-versions.component';

describe('ModelVersionsComponent', () => {
  let component: ModelVersionsComponent;
  let fixture: ComponentFixture<ModelVersionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModelVersionsComponent, ModelVersionsRowComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelVersionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
