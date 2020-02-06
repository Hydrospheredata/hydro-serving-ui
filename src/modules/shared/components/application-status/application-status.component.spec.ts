import { ChangeDetectionStrategy, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationStatus, ApplicationStatusComponent } from '@shared/_index';
import { getNativeElement } from '@testing/helpers';
import { IconComponent } from '../icons/icons.component';

describe('ApplicationStatusComponent', () => {
  let component: ApplicationStatusComponent;
  let fixture: ComponentFixture<ApplicationStatusComponent>;
  let debugElement: DebugElement;
  let nativeElement: HTMLElement;
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

  it('show default text if status is undefined', () => {
    component.status = 'unknown_status' as ApplicationStatus;
    const statusEl = nativeElement.querySelector('.application__status-unknown');
    expect(statusEl).toBeTruthy();
  });

  it('show success icon', () => {
    component.status =  ApplicationStatus.Ready;
    fixture.detectChanges();
    const statusEl = nativeElement.querySelector(
      '.application__status-icon--released'
    );
    expect(statusEl).toBeTruthy();
  });
  it('show failed icon', () => {
    component.status =  ApplicationStatus.Failed;
    fixture.detectChanges();
    const statusEl = nativeElement.querySelector('.application__status-icon--failed');
    expect(statusEl).toBeTruthy();
  });
  it('show serving icon', () => {
    component.status =  ApplicationStatus.Assembling;
    fixture.detectChanges();
    const statusEl = nativeElement.querySelector('.application__status-icon--assembling');
    expect(statusEl).toBeTruthy();
  });

});
