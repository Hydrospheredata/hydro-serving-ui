import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUpdateServiceComponent } from './dialog-update-service.component';

describe('DialogUpdateServiceComponent', () => {
  let component: DialogUpdateServiceComponent;
  let fixture: ComponentFixture<DialogUpdateServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogUpdateServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUpdateServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should be created', () => {
  //   expect(component).toBeTruthy();
  // });
});
