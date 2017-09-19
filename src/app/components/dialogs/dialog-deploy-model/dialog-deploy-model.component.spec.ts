import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeployModelComponent } from './dialog-deploy-model.component';

describe('DialogDeployModelComponent', () => {
  let component: DialogDeployModelComponent;
  let fixture: ComponentFixture<DialogDeployModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDeployModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeployModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
