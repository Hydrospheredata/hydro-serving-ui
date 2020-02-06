import { DebugElement, ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModelVersionStatus } from '@shared/_index';
import { SharedModule } from '@shared/shared.module';
import { getNativeElement } from '@testing/helpers';
import { ModelVersionStatusComponent } from './model-version-status.component';

describe('ModelVersionStatusComponent', () => {
  let component: ModelVersionStatusComponent;
  let fixture: ComponentFixture<ModelVersionStatusComponent>;
  let debugElement: DebugElement;
  let nativeElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ModelVersionStatusComponent],
    })
    .overrideComponent(ModelVersionStatusComponent, {
      set: {
        changeDetection: ChangeDetectionStrategy.Default,
      },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelVersionStatusComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    nativeElement = getNativeElement(debugElement);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('show default text if status is undefined', () => {
    component.status = 'unknown_status' as ModelVersionStatus;
    const statusEl = nativeElement.querySelector('.model-version-status--undefined');
    expect(statusEl).toBeTruthy();
  });

  it('show success icon', () => {
    component.status =  ModelVersionStatus.Released;
    fixture.detectChanges();
    const statusEl = nativeElement.querySelector(
      '.model-version-status--released'
    );
    expect(statusEl).toBeTruthy();
  });
  it('show failed icon', () => {
    component.status =  ModelVersionStatus.Failed;
    fixture.detectChanges();
    const statusEl = nativeElement.querySelector('.model-version-status--failed');
    expect(statusEl).toBeTruthy();
  });
  it('show serving icon', () => {
    component.status =  ModelVersionStatus.Assembling;
    fixture.detectChanges();
    const statusEl = nativeElement.querySelector('.model-version-status--assembling');
    expect(statusEl).toBeTruthy();
  });
});
