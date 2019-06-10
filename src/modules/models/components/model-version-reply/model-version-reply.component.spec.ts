import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelVersionReplyComponent } from './model-version-reply.component';

describe('ModelVersionReplyComponent', () => {
  let component: ModelVersionReplyComponent;
  let fixture: ComponentFixture<ModelVersionReplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelVersionReplyComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelVersionReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
