import { TestBed, inject } from '@angular/core/testing';

import { BuildModelService } from './build-model.service';
import { HttpService } from '@shared/services/http/_index';
import { ModelRuntimeBuilder } from '@shared/builders/_index';

describe('BuildModelService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                BuildModelService,
                { provide: HttpService, useValue: {} },
                { provide: ModelRuntimeBuilder, useValue: {} }
            ]
        });
    });

    it('should be created', inject([BuildModelService], (service: BuildModelService) => {
        expect(service).toBeTruthy();
    }));
});
