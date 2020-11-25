import { ChangeDetectionStrategy, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationStatus } from '@app/core/data/types';
import { getNativeElement } from '@testing/helpers';
import { IconComponent } from '../icons/icons.component';
import { ApplicationStatusComponent } from '@app/shared/components';

describe('ApplicationStatusComponent', () => {
  let component: ApplicationStatusComponent;
  let fixture: ComponentFixture<ApplicationStatusComponent>;
  let debugElement: DebugElement;
  let nativeElement: HTMLElement;
  const rootClass = 'app-status';
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [ApplicationStatusComponent, IconComponent],
    })
      .overrideComponent(ApplicationStatusComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationStatusComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    nativeElement = getNativeElement(debugElement);

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('show success icon', () => {
    component.status = ApplicationStatus.Ready;
    fixture.detectChanges();
    const statusEl = nativeElement.querySelector(`.${rootClass}--released`);
    expect(statusEl).toBeTruthy();
  });
  it('show failed icon', () => {
    component.status = ApplicationStatus.Failed;
    fixture.detectChanges();
    const statusEl = nativeElement.querySelector(`.${rootClass}--failed`);
    expect(statusEl).toBeTruthy();
  });
  it('show serving icon', () => {
    component.status = ApplicationStatus.Assembling;
    fixture.detectChanges();
    const statusEl = nativeElement.querySelector(`.${rootClass}--assembling`);
    expect(statusEl).toBeTruthy();
  });
});
