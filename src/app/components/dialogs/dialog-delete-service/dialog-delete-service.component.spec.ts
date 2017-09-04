import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteServiceComponent } from './dialog-delete-service.component';

describe('DialogDeleteServiceComponent', () => {
  let component: DialogDeleteServiceComponent;
  let fixture: ComponentFixture<DialogDeleteServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDeleteServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeleteServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
