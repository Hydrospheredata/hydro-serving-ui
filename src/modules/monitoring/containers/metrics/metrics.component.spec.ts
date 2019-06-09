import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogService } from '@dialog/dialog.service';
import { StoreModule } from '@ngrx/store';
import { MetricComponent } from '@testing/components';
import { MetricsComponent } from './metrics.component';

const MockDialogService = {};

describe('MetricsComponent', () => {
  let component: MetricsComponent;
  let fixture: ComponentFixture<MetricsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      declarations: [MetricsComponent, MetricComponent],
      providers: [{
        provide: DialogService, useValue: MockDialogService,
      }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
