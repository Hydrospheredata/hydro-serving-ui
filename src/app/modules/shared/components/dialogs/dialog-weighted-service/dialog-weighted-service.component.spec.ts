import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogWeightedServiceComponent } from './dialog-weighted-service.component';

describe('DialogWeightedServiceComponent', () => {
  let component: DialogWeightedServiceComponent;
  let fixture: ComponentFixture<DialogWeightedServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogWeightedServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogWeightedServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
