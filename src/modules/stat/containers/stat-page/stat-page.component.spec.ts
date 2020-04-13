import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatPageComponent } from './stat-page.component';
import { SharedModule } from "@shared/shared.module";
import { FeatureReportComponent } from "../../components/feature-report/feature-report.component";
import { HistogramComponent } from "../../components";
import { ColorByDriftDirective } from "../../directives";
import { StatService } from "../../services/stat.service";
import { mockStat } from "../../models";
import { of } from "@node_modules/rxjs";

const mockedStatService = {
  stat$: of(mockStat)
}
describe('StatPageComponent', () => {
  let component: StatPageComponent;
  let fixture: ComponentFixture<StatPageComponent>;

  beforeEach(( )=> {
    TestBed.configureTestingModule({
      declarations: [
        StatPageComponent,
        FeatureReportComponent,
        HistogramComponent,
        ColorByDriftDirective
      ],
      imports: [SharedModule],
    }).overrideComponent(StatPageComponent, {
      set: {
        providers: [{
          provide: StatService, useValue: mockedStatService
        }]
      }
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
