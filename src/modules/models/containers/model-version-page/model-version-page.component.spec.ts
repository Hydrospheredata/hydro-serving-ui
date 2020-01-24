import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelVersionPageComponent } from './model-version-page.component';

describe('ModelVersionPageComponent', () => {
  let component: ModelVersionPageComponent;
  let fixture: ComponentFixture<ModelVersionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModelVersionPageComponent],
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
