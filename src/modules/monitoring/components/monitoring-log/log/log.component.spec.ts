import { DebugElement, ChangeDetectionStrategy, SimpleChange } from '@angular/core';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { mockCheckCollection } from '@monitoring/interfaces';
import { CheckIdToTimePipe } from '@monitoring/pipes';
import { By } from '@node_modules/@angular/platform-browser';
import { LoaderComponent } from '@shared/components';
import { SharedModule } from '@shared/shared.module';
import { LogDetailComponent } from '@testing/components';
import { LogComponent } from './log.component';

fdescribe('Log component', () => {
  let fixture: ComponentFixture<LogComponent>;
  let component: LogComponent;
  let debugElement: DebugElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LogComponent, LogDetailComponent, CheckIdToTimePipe],
      imports: [SharedModule],
    })
      .overrideComponent(LogComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LogComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    component.checks = mockCheckCollection;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should NOT DISPLAY loader', () => {
    const loader = debugElement.query(By.directive(LoaderComponent));
    expect(loader).toBeNull();
  });

  it('should DISPLAY checks list', () => {
    const loader = debugElement.query(By.css('.log__ids'));
    expect(loader).toBeTruthy();
  });

  it('should select FIRST check', () => {
    component.ngOnChanges({
      checks: new SimpleChange(null, mockCheckCollection, false),
    });
    expect(component.selectedCheck).toBe(component.checks.getChecks()[0]);
  });

  describe('on loading', () => {
    beforeEach(async(() => {
      component.loading = true;
      fixture.detectChanges();
    }));
    it('should DISPLAY loader', function () {
      const loader = debugElement.query(By.directive(LoaderComponent));
      expect(loader).toBeTruthy();
    });
  });
});
