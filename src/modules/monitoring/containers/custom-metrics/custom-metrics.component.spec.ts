import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomMetricsComponent } from './custom-metrics.component';

describe('CustomMetricsComponent', () => {
  let component: CustomMetricsComponent;
  let fixture: ComponentFixture<CustomMetricsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomMetricsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
