import { TestBed, inject } from '@angular/core/testing';

import { HttpModelServiceService } from './http-model-service.service';
import { ModelBuilder } from '@shared/builders/_index';
import { HttpService } from '@shared/services/http/_index';
describe('ModelServiceService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                HttpModelServiceService,
                { provide: HttpService, useValue: {} },
                { provide: ModelBuilder, useValue: {} }
            ]
        });
    });

    it('should be created', inject([HttpModelServiceService], (service: HttpModelServiceService) => {
        expect(service).toBeTruthy();
    }));
});
