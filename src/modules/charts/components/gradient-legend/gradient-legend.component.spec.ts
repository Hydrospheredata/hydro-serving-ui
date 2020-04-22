import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradientLegendComponent } from './gradient-legend.component';

describe('GradientLegendComponent', () => {
  let component: GradientLegendComponent;
  let fixture: ComponentFixture<GradientLegendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GradientLegendComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradientLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
