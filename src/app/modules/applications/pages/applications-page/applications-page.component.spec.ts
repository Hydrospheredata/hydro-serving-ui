import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ApplicationsFacade } from '@app/core/facades/applications.facade';
import { ModelsFacade } from '@app/core/facades/models.facade';
import { DeploymentConfigsFacade } from '@app/core/facades/deployment-configs.facade';

import { DialogsService } from '@app/modules/dialogs/dialogs.service';
import { SharedModule } from '@app/shared/shared.module';

import { instance, mock, when } from 'ts-mockito';
import { MockDeploymentConfig1 } from '@testing/factories/deployment-config';
import { ApplicationsPageComponent } from './applications-page.component';

describe('ApplicationsPageComponent', () => {
  let component: ApplicationsPageComponent;
  let fixture: ComponentFixture<ApplicationsPageComponent>;
  let debugElement: DebugElement;

  const mockedApplicationsFacade: ApplicationsFacade = mock(ApplicationsFacade);
  const mockedModelsFacade: ModelsFacade = mock(ModelsFacade);
  const mockedDeploymentConfigsFacade: DeploymentConfigsFacade = mock(
    DeploymentConfigsFacade
  );
  const mockedDialogsService: DialogsService = mock(DialogsService);

  when(mockedModelsFacade.someModelVersionIsReleased()).thenReturn(of(true));
  when(mockedDeploymentConfigsFacade.getAll()).thenReturn(
    of([MockDeploymentConfig1.build()])
  );

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationsPageComponent],
      imports: [SharedModule, RouterTestingModule, HttpClientTestingModule],
      providers: [
        {
          provide: ApplicationsFacade,
          useFactory: () => instance(mockedApplicationsFacade),
        },
        {
          provide: ModelsFacade,
          useFactory: () => instance(mockedModelsFacade),
        },
        {
          provide: DeploymentConfigsFacade,
          useFactory: () => instance(mockedDeploymentConfigsFacade),
        },
        {
          provide: DialogsService,
          useFactory: () => instance(mockedDialogsService),
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationsPageComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
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

    // describe('when some modelVersion released and depConfigs does not exist', () => {
    //   it('should be disabled', () => {
    //     when(mockedModelsFacade.someModelVersionIsReleased()).thenReturn(of(true));
    //     when(mockedDeploymentConfigsFacade.getAll()).thenReturn(of());
    //
    //     TestBed.overrideProvider(ModelsFacade, {useValue: instance(mockedModelsFacade)});
    //     TestBed.overrideProvider(DeploymentConfigsFacade, {useValue: instance(mockedDeploymentConfigsFacade)});
    //     TestBed.compileComponents();
    //
    //     expect(buttonDE.nativeElement.disabled).toBeTruthy();
    //   });
    // });
    //
    // describe('when some modelVersion not released and depConfigs exist', () => {
    //   it('should be disabled', () => {
    //     when(mockedModelsFacade.someModelVersionIsReleased()).thenReturn(of(false));
    //     when(mockedDeploymentConfigsFacade.getAll()).thenReturn(of([MockDeploymentConfig1.build()]));
    //
    //     TestBed.overrideProvider(ModelsFacade, {useValue: instance(mockedModelsFacade)});
    //     TestBed.overrideProvider(DeploymentConfigsFacade, {useValue: instance(mockedDeploymentConfigsFacade)});
    //     TestBed.compileComponents();
    //
    //     expect(buttonDE.nativeElement.disabled).toBeTruthy();
    //   });
    // });
    //
    // describe('when some modelVersion not released and depConfigs does not exist', () => {
    //   it('should be disabled', () => {
    //     when(mockedModelsFacade.someModelVersionIsReleased()).thenReturn(of(false));
    //     when(mockedDeploymentConfigsFacade.getAll()).thenReturn(of());
    //
    //     TestBed.overrideProvider(ModelsFacade, {useValue: instance(mockedModelsFacade)});
    //     TestBed.overrideProvider(DeploymentConfigsFacade, {useValue: instance(mockedDeploymentConfigsFacade)});
    //     TestBed.compileComponents();
    //
    //     expect(buttonDE.nativeElement.disabled).toBeTruthy();
    //   });
    // });

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
