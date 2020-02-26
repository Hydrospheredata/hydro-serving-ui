import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationPageComponent } from './visualization-page.component';

describe('VisualizationComponent', () => {
  let component: VisualizationPageComponent;
  let fixture: ComponentFixture<VisualizationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VisualizationPageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
