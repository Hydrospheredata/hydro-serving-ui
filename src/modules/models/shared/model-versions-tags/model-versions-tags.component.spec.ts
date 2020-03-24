import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelVersionsTagsComponent } from './model-versions-tags.component';

describe('ModelVersionsTagsComponent', () => {
  let component: ModelVersionsTagsComponent;
  let fixture: ComponentFixture<ModelVersionsTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModelVersionsTagsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelVersionsTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
