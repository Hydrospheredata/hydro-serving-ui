import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatFacade } from '../../stat.facade';

import { StatPageComponent } from './stat-page.component';
import { SharedModule } from '@shared/shared.module';
import { FeatureReportComponent } from '../../components/feature-report/feature-report.component';
import { HistogramComponent } from '../../components';
import { ColorByDriftDirective } from '../../directives';
import { mockStat } from '../../mocks';
import { of } from '@node_modules/rxjs';
import { RouterTestingModule } from '@node_modules/@angular/router/testing';

const mockedStatFacade = {
  stat$: of(mockStat),
};

describe('StatPageComponent', () => {
  let component: StatPageComponent;
  let fixture: ComponentFixture<StatPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        StatPageComponent,
        FeatureReportComponent,
        HistogramComponent,
        ColorByDriftDirective,
      ],
      imports: [SharedModule, RouterTestingModule],
    })
      .overrideComponent(StatPageComponent, {
        set: {
          providers: [
            {
              provide: StatFacade,
              useValue: mockedStatFacade,
            },
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
