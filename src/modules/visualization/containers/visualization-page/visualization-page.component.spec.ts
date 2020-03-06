import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SharedModule } from '@shared/shared.module';
import { ScatterPlotComponent } from '@testing/components';
import { VisualizationPageService } from 'modules/visualization/services';
import { BehaviorSubject, of } from 'rxjs';
import { VisualizationPageComponent } from './visualization-page.component';

fdescribe('VisualizationComponent', () => {
  let component: VisualizationPageComponent;
  let fixture: ComponentFixture<VisualizationPageComponent>;
  let debugElement: DebugElement;
  let visualizationService: Partial<VisualizationPageService>;

  let loadingSpy$: jasmine.Spy;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VisualizationPageComponent, ScatterPlotComponent],
      imports: [SharedModule],
      providers: [
        {
          provide: VisualizationPageService,
          useValue: {
            loading$: new BehaviorSubject(false),
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizationPageComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    visualizationService = TestBed.get(VisualizationPageService);

    loadingSpy$ = spyOn(visualizationService, 'loading$');
    loadingSpy$.and.returnValue(of(false));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loader is hidden', () => {
    const loaderDE = debugElement.query(By.css('.visualization__loader'));
    expect(loaderDE).toBeFalsy();
  });

  describe('when loading', () => {
    beforeEach(() => {
      loadingSpy$.and.returnValue(of(true));
      fixture.detectChanges();
    });
    it('loader is visible', () => {
      visualizationService.loading$.subscribe();
      const loaderDE = debugElement.query(By.css('.visualization__loader'));
      expect(loaderDE).toBeTruthy();
    });
  });
});
