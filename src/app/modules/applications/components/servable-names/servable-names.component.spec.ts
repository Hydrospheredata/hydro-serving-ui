import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServableNamesComponent } from './servable-names.component';

describe('ServableNamesComponent', () => {
  let component: ServableNamesComponent;
  let fixture: ComponentFixture<ServableNamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServableNamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServableNamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
