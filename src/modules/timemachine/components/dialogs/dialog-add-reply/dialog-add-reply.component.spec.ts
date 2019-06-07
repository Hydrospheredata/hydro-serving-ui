import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddReplyComponent } from './dialog-add-reply.component';

describe('DialogAddReplyComponent', () => {
  let component: DialogAddReplyComponent;
  let fixture: ComponentFixture<DialogAddReplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddReplyComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
