import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '@shared/shared.module';
import { HsD3Module } from 'modules/hs-d3/hs-d3.module';
import { CheckChartComponent } from '@monitoring/components';
import { mockChartConfig } from '@monitoring/interfaces';

describe('CheckChartComponent', () => {
  let component: CheckChartComponent;
  let fixture: ComponentFixture<CheckChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CheckChartComponent],
      imports: [SharedModule, HsD3Module],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckChartComponent);
    component = fixture.componentInstance;
    component.config = mockChartConfig;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
