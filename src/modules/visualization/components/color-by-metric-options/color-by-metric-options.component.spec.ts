import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorByMetricOptionsComponent } from './color-by-metric-options.component';

describe('ColorByMetricOptionsComponent', () => {
  let component: ColorByMetricOptionsComponent;
  let fixture: ComponentFixture<ColorByMetricOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorByMetricOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorByMetricOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
