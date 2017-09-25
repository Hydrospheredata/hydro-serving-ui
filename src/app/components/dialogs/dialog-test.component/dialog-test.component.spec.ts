import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTestComponent } from './dialog-test.component';

describe('DialogTestComponent', () => {
  let component: DialogTestComponent;
  let fixture: ComponentFixture<DialogTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
