import { TestBed, inject } from '@angular/core/testing';

import { LoaderStateService } from './loader-state.service';

describe('LoaderStateService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [LoaderStateService],
        });
    });

    it('should be created', inject([LoaderStateService], (service: LoaderStateService) => {
        expect(service).toBeTruthy();
    }));
});
