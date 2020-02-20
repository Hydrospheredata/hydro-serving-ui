import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApplicationsFacade } from '@applications/store';
import { DialogService } from '@dialog/dialog.service';
import { SharedModule } from '@shared/shared.module';
import { getNativeElement } from '@testing/helpers';
import { ApplicationsPageComponent } from './applications-page.component';

import { By } from '@angular/platform-browser';

import { of, BehaviorSubject } from 'rxjs';

import { DebugElement } from '@angular/core';
import { ModelsFacade } from '@models/store';
const mockApplicationsFacade: Partial<ApplicationsFacade> = {};
const mockModelsFacade = {
  someModelVersionIsReleased$: new BehaviorSubject(false),
};

describe('ApplicationsPageComponent', () => {
  let component: ApplicationsPageComponent;
  let fixture: ComponentFixture<ApplicationsPageComponent>;
  let debugElement: DebugElement;
  let modelsFacade;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationsPageComponent],
      imports: [SharedModule, RouterTestingModule],
      providers: [
        { provide: ApplicationsFacade, useValue: mockApplicationsFacade },
        { provide: ModelsFacade, useValue: mockModelsFacade },
        { provide: DialogService, useValue: {} },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationsPageComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    modelsFacade = TestBed.get(ModelsFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('add application button', () => {
    let buttonDE: DebugElement;
    beforeEach(() => {
      buttonDE = debugElement.query(By.css('.applications-page__button'));
    });
    it('exists', () => {
      expect(buttonDE).toBeTruthy();
    });

    it('disabled if none model versions is released', () => {
      const el: HTMLButtonElement = getNativeElement(
        buttonDE
      ) as HTMLButtonElement;
      expect(el.disabled).toBeTruthy();
    });
    it('enabled if models list is not empty', () => {
      const el: HTMLButtonElement = getNativeElement(
        buttonDE
      ) as HTMLButtonElement;
      modelsFacade.someModelVersionIsReleased$.next(true);
      fixture.detectChanges();

      expect(el.disabled).toBeFalsy();
    });
  });

  describe('message', () => {
    let messageDE: DebugElement;

    it('doesn\'t exist if some modelVersion released', () => {
      modelsFacade.someModelVersionIsReleased$.next(true);
      fixture.detectChanges();
      messageDE = debugElement.query(By.css('.applications-page__message'));
      expect(messageDE).toBeFalsy();
    });

    it('exists if none modelVersion is released', () => {
      modelsFacade.someModelVersionIsReleased$.next(false);
      fixture.detectChanges();
      messageDE = debugElement.query(By.css('.applications-page__message'));
      expect(messageDE).toBeTruthy();
    });
  });
});
