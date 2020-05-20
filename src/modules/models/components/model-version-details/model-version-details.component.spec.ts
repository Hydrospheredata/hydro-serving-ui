import { DebugElement, ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ApplicationsFacade } from '@applications/store';
import { ModelVersion } from '@shared/_index';
import { SharedModule } from '@shared/shared.module';
import {
  ModelVersionLogComponent,
  SignaturesComponent,
  ModelVersionServicesComponent,
} from '@testing/components';
import { ServablesTableComponent } from '@testing/components/mock-servables-table.component';
import {
  MockModelVersion1Model1,
  FailedModelVersion,
} from '@testing/factories/modelVersion';
import { ModelVersionStatusComponent } from '../model-version-status/model-version-status.component';
import { ModelVersionDetailsComponent } from './model-version-details.component';

describe('ModelVersionDetailsComponent', () => {
  let component: ModelVersionDetailsComponent;
  let fixture: ComponentFixture<ModelVersionDetailsComponent>;
  let applicationsFacade: ApplicationsFacade;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ModelVersionDetailsComponent,
        ModelVersionLogComponent,
        ServablesTableComponent,
        SignaturesComponent,
        ModelVersionStatusComponent,
        ModelVersionServicesComponent,
      ],
      imports: [SharedModule, RouterTestingModule],
      providers: [
        {
          provide: ApplicationsFacade,
          useValue: {
            createApplicationFromModelVersion: (
              modelVersion: ModelVersion
            ) => {},
          },
        },
      ],
    })
      .overrideComponent(ModelVersionDetailsComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelVersionDetailsComponent);
    component = fixture.componentInstance;
    applicationsFacade = TestBed.get(ApplicationsFacade);
    component.modelVersion = MockModelVersion1Model1;

    fixture.detectChanges();
  });

  it('it should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('add application button', () => {
    let button: DebugElement;

    beforeEach(() => {
      button = fixture.debugElement.query(By.css('.create-application-button'));
      spyOn(component, 'onAddApplication').and.callThrough();
    });
    it('shown if model version released', () => {
      expect(button.nativeElement).toBeTruthy();
      expect(button.nativeElement.disabled).toBeFalsy();
    });
    it('disabled if model version is not released', () => {
      component.modelVersion = FailedModelVersion;
      fixture.detectChanges();
      expect(button.nativeElement.disabled).toBeTruthy();
    });
    it('contains right text', () => {
      expect(button.nativeElement.textContent).toContain('create app');
    });

    it('onClick trigger wright component function', () => {
      button.triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(component.onAddApplication).toHaveBeenCalled();
      expect(component.onAddApplication).toHaveBeenCalledTimes(1);
    });

    it('add application', () => {
      spyOn(applicationsFacade, 'createApplicationFromModelVersion');
      button.triggerEventHandler('click', null);
      fixture.detectChanges();

      expect(
        applicationsFacade.createApplicationFromModelVersion
      ).toHaveBeenCalled();
      expect(
        applicationsFacade.createApplicationFromModelVersion
      ).toHaveBeenCalledTimes(1);
      expect(
        applicationsFacade.createApplicationFromModelVersion
      ).toHaveBeenCalledWith(component.modelVersion);
    });
  });
});
