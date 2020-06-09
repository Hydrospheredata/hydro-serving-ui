import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecksListComponent } from './checks-list.component';

describe('ChecksListComponent', () => {
  let component: ChecksListComponent;
  let fixture: ComponentFixture<ChecksListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChecksListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
