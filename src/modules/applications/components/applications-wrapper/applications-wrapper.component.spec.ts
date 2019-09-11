import { Provider, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ApplicationsFacade } from '@applications/store';
import { DialogService } from '@dialog/dialog.service';
import { ModelsFacade } from '@models/store';
import { SharedModule } from '@shared/shared.module';
import { MockApplication } from '@testing/factories/application';
import { of, BehaviorSubject } from 'rxjs';
import { ApplicationsWrapperComponent } from './applications-wrapper.component';

const applicationFacadeProvider: Provider = {
  provide: ApplicationsFacade,
  useValue: {
    allApplications$: of([MockApplication]),
  },
};
const modelsFacadeProvider: Provider = {
  provide: ModelsFacade,
  useValue: {
    someModelVersionIsReleased$: new BehaviorSubject(false),
  },
};

describe('ApplicationsWrapperComponent', () => {
  let component: ApplicationsWrapperComponent;
  let fixture: ComponentFixture<ApplicationsWrapperComponent>;

  let modelsFacade;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationsWrapperComponent],
      imports: [SharedModule, RouterTestingModule, NoopAnimationsModule],
      providers: [
        DialogService,
        applicationFacadeProvider,
        modelsFacadeProvider,
      ],
    }).compileComponents();

    modelsFacade = TestBed.get(ModelsFacade);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationsWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('add application button', () => {
    let button: DebugElement;
    beforeEach(() => {
      button = fixture.debugElement.query(By.css('.add-application__button'));
    });

    it('exists', () => {
      expect(button.nativeElement).toBeTruthy();
    });

    it('must be disabled if none released model version', () => {
      expect(button.nativeElement.disabled).toBeTruthy();
    });
    it('must be enabled if some released model version', () => {
      modelsFacade.someModelVersionIsReleased$.next(true);
      fixture.detectChanges();
      expect(button.nativeElement.disabled).toBeFalsy();
    });
  });

  describe('alert message', () => {
    let message: DebugElement;
    it('must be shown if none model version released', () => {
      modelsFacade.someModelVersionIsReleased$.next(false);
      fixture.detectChanges();
      message = fixture.debugElement.query(
        By.css('.application-wrapper__alert-message')
      );
      expect(message).toBeTruthy();
    });
    it('mustn\'t be shown if some model version released', () => {
      modelsFacade.someModelVersionIsReleased$.next(true);
      fixture.detectChanges();
      message = fixture.debugElement.query(
        By.css('.application-wrapper__alert-message')
      );
      expect(message).toBeNull();
    });
  });
});
