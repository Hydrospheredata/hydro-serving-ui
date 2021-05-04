import { TestBed } from '@angular/core/testing';
import { ModelVersionsFacade } from '@app/core/facades/model-versions.facade';
import { ModelsFacade } from '@app/core/facades/models.facade';
import { DeploymentConfigsFacade } from '@app/core/facades/deployment-configs.facade';
import { CustomValidatorsService } from '@app/core/custom-validators.service';

import { MockModel1 } from '@testing/factories/model';
import { MockModelVersion1Model1 } from '@testing/factories/modelVersion';
import { MockDeploymentConfig1, MockDeploymentConfig2 } from '@testing/factories/deployment-config';
import createSpyObj = jasmine.createSpyObj;
import SpyObj = jasmine.SpyObj;

import { of } from 'rxjs';
import { ModelVariantFormService } from './model-variant-form.service';

describe('ModelVariantFormService', () => {
  let service: ModelVariantFormService;
  let customValidatorsServiceSpy: SpyObj<CustomValidatorsService>;
  const spyCustomValidatorsService = createSpyObj('CustomValidatorsService', ['required']);
  const mockModelVersionsFacade = createSpyObj('ModelVersionsFacade', ['modelVersionsByModelId']);
  const mockModelsFacade = createSpyObj('ModelsFacade', ['firstModel']);
  const mockDeploymentConfigsFacade = createSpyObj('DeploymentConfigsFacade', ['getAll', 'defaultDepConfig']);

  spyCustomValidatorsService.required.and.returnValue('Field is required');
  mockModelsFacade.firstModel.and.returnValue(of([MockModel1]));
  mockModelVersionsFacade.modelVersionsByModelId.withArgs(1).and.returnValue(of([MockModelVersion1Model1]));

  mockDeploymentConfigsFacade.getAll.and.returnValue(of([MockDeploymentConfig1]));
  mockDeploymentConfigsFacade.defaultDepConfig.and.returnValue(of([MockDeploymentConfig2]));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ModelVariantFormService,
        { provide: CustomValidatorsService, useValue: spyCustomValidatorsService },
        { provide: ModelVersionsFacade, useValue: mockModelVersionsFacade },
        { provide: ModelsFacade, useValue: mockModelsFacade },
        { provide: DeploymentConfigsFacade, useValue: mockDeploymentConfigsFacade }
      ]
    });

    service = TestBed.inject(ModelVariantFormService);
    customValidatorsServiceSpy = TestBed.inject(CustomValidatorsService) as jasmine.SpyObj<CustomValidatorsService>;
  })

  it('should create service', () => {
    expect(service).toBeTruthy();
  });
})
