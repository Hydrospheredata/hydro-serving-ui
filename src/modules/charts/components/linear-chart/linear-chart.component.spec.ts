import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinearChartComponent } from './linear-chart.component';

describe('LinearChartComponent', () => {
  let component: LinearChartComponent;
  let fixture: ComponentFixture<LinearChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LinearChartComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinearChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
