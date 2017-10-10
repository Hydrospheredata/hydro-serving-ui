import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBaseComponent } from './dialog-base.component';

describe('DialogBaseComponent', () => {
  let component: DialogBaseComponent;
  let fixture: ComponentFixture<DialogBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
