import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddServiceComponent } from './dialog-add-service.component';

describe('DialogAddServiceComponent', () => {
  let component: DialogAddServiceComponent;
  let fixture: ComponentFixture<DialogAddServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
