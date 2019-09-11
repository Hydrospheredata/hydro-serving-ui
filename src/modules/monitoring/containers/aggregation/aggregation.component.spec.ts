import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AggregationComponent } from '@monitoring/containers/aggregation/aggregation.component';
import { CheckIdToTimePipe } from '@monitoring/pipes';
import { SharedModule } from '@shared/shared.module';

describe('Aggregation component', () => {
  let fixture: ComponentFixture<AggregationComponent>;
  let component: AggregationComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AggregationComponent, CheckIdToTimePipe],
      imports: [SharedModule],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggregationComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
