import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTestModelComponent } from './dialog-test-model.component';

describe('DialogTestModelComponent', () => {
  let component: DialogTestModelComponent;
  let fixture: ComponentFixture<DialogTestModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogTestModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTestModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
