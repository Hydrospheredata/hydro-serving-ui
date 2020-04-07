import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '@shared/shared.module';
import { ScatterPlotComponent, LogDetailComponent } from '@testing/components';
import { VisualizationPageComponent } from './visualization-page.component';
import {VisualizationFacade} from "../../visualization.facade";

describe('VisualizationComponent', () => {
  let component: VisualizationPageComponent;
  let fixture: ComponentFixture<VisualizationPageComponent>;
  let debugElement: DebugElement;
  let visualizationService: Partial<VisualizationFacade>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VisualizationPageComponent, ScatterPlotComponent, LogDetailComponent],
      imports: [SharedModule],
      providers: [{ provide: VisualizationFacade, useValue: {}}]
    }).overrideComponent(VisualizationPageComponent, {
      set: {
        providers: [{ provide: VisualizationFacade, useValue: { loadEmbedding: () => {}}}]
      }
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizationPageComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    visualizationService = TestBed.get(VisualizationFacade);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
