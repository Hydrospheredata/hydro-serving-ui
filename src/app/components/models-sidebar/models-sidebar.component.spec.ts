import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelsSidebarComponent } from './models-sidebar.component';

describe('ModelsSidebarComponent', () => {
  let component: ModelsSidebarComponent;
  let fixture: ComponentFixture<ModelsSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelsSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelsSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
