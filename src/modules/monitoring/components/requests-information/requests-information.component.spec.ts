import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
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
    })
      .overrideComponent(RequestsInformationComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('loader', () => {
    it('wasn\'t shown', () => {
      const de = fixture.debugElement.query(By.css('.requests-info__loader'));
      expect(de).toBeNull();
    });
    it('was shown when loading', () => {
      component.loading = true;
      fixture.detectChanges();

      const de = fixture.debugElement.query(By.css('.requests-info__loader'));
      expect(de).toBeTruthy();
    });
  });
});
