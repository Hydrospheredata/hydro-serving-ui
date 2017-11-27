import { TestBed, inject } from '@angular/core/testing';

import { HttpRuntimeTypesService } from './http-runtime-types.service';
import { RuntimeTypeBuilder } from '@shared/builders/_index';
import { HttpService } from '@shared/services/http/_index';

describe('HttpRuntimeTypesService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                HttpRuntimeTypesService,
                { provide: HttpService, useValue: {} },
                { provide: RuntimeTypeBuilder, useValue: {} }
            ]
        });
    });

    it('should be created', inject([HttpRuntimeTypesService], (service: HttpRuntimeTypesService) => {
        expect(service).toBeTruthy();
    }));
});
