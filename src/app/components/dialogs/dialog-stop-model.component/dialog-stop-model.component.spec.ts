import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogStopModelComponent } from './dialog-stop-model.component';

describe('DialogStopModelComponent', () => {
  let component: DialogStopModelComponent;
  let fixture: ComponentFixture<DialogStopModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogStopModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogStopModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
