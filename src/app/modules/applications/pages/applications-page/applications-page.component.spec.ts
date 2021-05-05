import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, Observable } from 'rxjs';

import { Application } from '@app/core/data/types';
import { ApplicationsFacade } from '@app/core/facades/applications.facade';
import { ModelsFacade } from '@app/core/facades/models.facade';
import { DeploymentConfigsFacade } from '@app/core/facades/deployment-configs.facade';

import { DialogsService } from '@app/modules/dialogs/dialogs.service';
import { SharedModule } from '@app/shared/shared.module';

import { MockApplication } from '@testing/factories/application';
import { MockDeploymentConfig1 } from '@testing/factories/deployment-config';
import createSpyObj = jasmine.createSpyObj;
import { ApplicationsPageComponent } from './applications-page.component';

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

  const mockModelsFacade = createSpyObj( ['someModelVersionIsReleased']);
  const mockDeploymentConfigsFacade = createSpyObj(['getAll']);
  const spyDialogsService = createSpyObj(['createDialog']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationsPageComponent],
      imports: [SharedModule, RouterTestingModule, HttpClientTestingModule],
      providers: [
        { provide: ApplicationsFacade, useValue: mockApplicationsFacade },
        { provide: ModelsFacade, useValue: mockModelsFacade },
        { provide: DeploymentConfigsFacade, useValue: mockDeploymentConfigsFacade },
        { provide: DialogsService, useValue: spyDialogsService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationsPageComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    mockModelsFacade.someModelVersionIsReleased.and.returnValue(of(true));
    mockDeploymentConfigsFacade.getAll.and.returnValue(of([MockDeploymentConfig1]));
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

    describe('when some modelVersion released and depConfigs exist', () => {
      it('should be enabled', () => {
        expect(buttonDE.nativeElement.disabled).toBeFalsy();
      });
    });

    describe('when some modelVersion released and depConfigs does not exist', () => {
      it('should be disabled', () => {
        TestBed.overrideProvider(mockModelsFacade, {useValue: of(true)});
        TestBed.overrideProvider(mockDeploymentConfigsFacade, {useValue: of()});

        fixture = TestBed.createComponent(ApplicationsPageComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        fixture.detectChanges();

        expect(buttonDE.nativeElement.disabled).toBeTruthy();
      });
    });

    describe('when some modelVersion not released and depConfigs exist', () => {
      it('should be disabled', () => {
        TestBed.overrideProvider(mockModelsFacade, {useValue: of(false)});
        TestBed.overrideProvider(mockDeploymentConfigsFacade, {useValue: of([MockDeploymentConfig1])});

        fixture = TestBed.createComponent(ApplicationsPageComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        fixture.detectChanges();

        expect(buttonDE.nativeElement.disabled).toBeTruthy();
      });
    });

    describe('when some modelVersion not released and depConfigs does not exist', () => {
      it('should be disabled', () => {
        TestBed.overrideProvider(mockModelsFacade, {useValue: of(false)});
        TestBed.overrideProvider(mockDeploymentConfigsFacade, {useValue: of()});

        fixture = TestBed.createComponent(ApplicationsPageComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        fixture.detectChanges();

        expect(buttonDE.nativeElement.disabled).toBeTruthy();
      });
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
