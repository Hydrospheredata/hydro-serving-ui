import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DialogService } from '@dialog/dialog.service';
import { MonitoringPageFacade } from '@monitoring/store/facades';
import { SharedModule } from '@shared/shared.module';
import {
  AggregationComponent,
  RequestsInformationComponent,
  LogComponent,
  CustomChecksComponent,
} from '@testing/components';
import { getErrorText } from '@testing/helpers';
import { Subject, BehaviorSubject, of } from 'rxjs';
import { MonitoringPageComponent } from './monitoring-page.component';

describe('MonitoringPageComponent', () => {
  let component: MonitoringPageComponent;
  let fixture: ComponentFixture<MonitoringPageComponent>;
  let debugElement: DebugElement;
  let facade: {
    loadMetrics: () => {};
    error$: Subject<string>;
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MonitoringPageComponent,
        AggregationComponent,
        RequestsInformationComponent,
        LogComponent,
        CustomChecksComponent,
      ],
      imports: [SharedModule],
      providers: [
        DialogService,
        {
          provide: MonitoringPageFacade,
          useValue: {
            loadMetrics: () => {},
            checksAggregations$: of([]),
            error$: new BehaviorSubject(''),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoringPageComponent);
    component = fixture.componentInstance;
    facade = TestBed.get(MonitoringPageFacade);
    debugElement = fixture.debugElement;
    spyOn(facade, 'loadMetrics');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('called loadMetrics function on init', () => {
    expect(facade.loadMetrics).toHaveBeenCalled();
    expect(facade.loadMetrics).toHaveBeenCalledTimes(1);
  });

  describe('if something failed', () => {
    const errorText = 'Error';
    beforeEach(() => {
      facade.error$.next(errorText);
      fixture.detectChanges();
    });

    it('shows error message', () => {
      const errorElement = debugElement.query(
        By.css('.monitoring-page__error')
      );
      fixture.detectChanges();
      expect(errorElement).toBeTruthy();
      expect(getErrorText(errorElement)).toContain(errorText);
    });
  });
});
