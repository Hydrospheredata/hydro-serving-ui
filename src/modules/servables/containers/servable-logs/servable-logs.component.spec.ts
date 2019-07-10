import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServableLogsComponent } from './servable-logs.component';

describe('ServableLogsComponent', () => {
  let component: ServableLogsComponent;
  let fixture: ComponentFixture<ServableLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ServableLogsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServableLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
