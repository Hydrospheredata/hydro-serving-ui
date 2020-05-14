import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '@shared/shared.module';
import {
  LogDetailComponent,
  ScatterPlotComponent,
  VisualizationMetricsComponent,
} from '@testing/components';
import { VisualizationPageComponent } from './visualization-page.component';
import { VisualizationFacade } from '../../visualization.facade';
import { RouterTestingModule } from '@node_modules/@angular/router/testing';

xdescribe('VisualizationComponent', () => {
  let component: VisualizationPageComponent;
  let fixture: ComponentFixture<VisualizationPageComponent>;
  let debugElement: DebugElement;
  let visualizationService: Partial<VisualizationFacade>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VisualizationPageComponent,
        ScatterPlotComponent,
        LogDetailComponent,
        VisualizationMetricsComponent,
      ],
      imports: [SharedModule, RouterTestingModule],
      providers: [{ provide: VisualizationFacade, useValue: {} }],
    })
      .overrideComponent(VisualizationPageComponent, {
        set: {
          providers: [
            {
              provide: VisualizationFacade,
              useValue: {
                loadEmbedding: () => {},
              },
            },
          ],
        },
      })
      .compileComponents();
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
