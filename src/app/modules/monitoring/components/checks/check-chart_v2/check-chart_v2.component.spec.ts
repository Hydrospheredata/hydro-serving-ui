import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckChartComponentV2 } from './check-chart_v2.component';

describe('CheckChartV2Component', () => {
  let component: CheckChartComponentV2;
  let fixture: ComponentFixture<CheckChartComponentV2>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckChartComponentV2 ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckChartComponentV2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
