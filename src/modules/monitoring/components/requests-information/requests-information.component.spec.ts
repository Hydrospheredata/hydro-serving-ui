import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckIdToTimePipe } from '@monitoring/pipes';
import { SharedModule } from '@shared/shared.module';
import {
  LatencyCheckComponent,
  ErrorCheckComponent,
} from '@testing/components';
import { RequestsInformationComponent } from './requests-information.component';

describe('RequestsInformationComponent', () => {
  let component: RequestsInformationComponent;
  let fixture: ComponentFixture<RequestsInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RequestsInformationComponent,
        CheckIdToTimePipe,
        LatencyCheckComponent,
        ErrorCheckComponent,
      ],
      imports: [SharedModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
