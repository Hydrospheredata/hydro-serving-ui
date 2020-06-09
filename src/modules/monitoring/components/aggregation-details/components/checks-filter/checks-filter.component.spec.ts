import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecksFilterComponent } from './checks-filter.component';

describe('ChecksFilterComponent', () => {
  let component: ChecksFilterComponent;
  let fixture: ComponentFixture<ChecksFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChecksFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecksFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
