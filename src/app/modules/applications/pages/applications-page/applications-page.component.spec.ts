import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Application } from '@app/core/data/types';
import { ApplicationsFacade } from '@app/core/facades/applications.facade';
import { DialogsService } from '@app/modules/dialogs/dialogs.service';
import { ModelsFacade } from '@app/core/facades/models.facade';
import { SharedModule } from '@app/shared/shared.module';
import { HttpClientTestingModule } from '@node_modules/@angular/common/http/testing';
import { MockApplication } from '@testing/factories/application';
import { getNativeElement } from '@testing/helpers';
import { of, BehaviorSubject, Observable } from 'rxjs';
import { ApplicationsPageComponent } from './applications-page.component';
import createSpyObj = jasmine.createSpyObj;

const mockApplicationsFacade: Partial<ApplicationsFacade> = {
  selectedApplication(): Observable<Application> {
    return of(MockApplication);
  },
  allApplications(): Observable<Application[]> {
    return of([MockApplication]);
  },
};

describe('ApplicationsPageComponent', () => {
  let component: ApplicationsPageComponent;
  let fixture: ComponentFixture<ApplicationsPageComponent>;
  let debugElement: DebugElement;
  let modelsFacade;
  const mockModelsFacade = createSpyObj('mockModelsFacade', [
    'someModelVersionIsReleased',
  ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationsPageComponent],
      imports: [SharedModule, RouterTestingModule, HttpClientTestingModule],
      providers: [
        { provide: ApplicationsFacade, useValue: mockApplicationsFacade },
        { provide: ModelsFacade, useValue: mockModelsFacade },
        { provide: DialogsService, useValue: {} },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationsPageComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    modelsFacade = TestBed.get(ModelsFacade);
    modelsFacade.someModelVersionIsReleased.and.returnValue(of('true'));
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
  });

  describe('message', () => {
    let messageDE: DebugElement;

    beforeEach(() => {});

    it("doesn't exist if some modelVersion released", () => {
      fixture.detectChanges();
      messageDE = debugElement.query(By.css('.applications-page__message'));
      expect(messageDE).toBeFalsy();
    });
  });
});
