import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServablesTableComponent } from './servables-table.component';

describe('ServablesTableComponent', () => {
  let component: ServablesTableComponent;
  let fixture: ComponentFixture<ServablesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ServablesTableComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServablesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
