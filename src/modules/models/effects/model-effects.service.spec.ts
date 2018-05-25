import {
    TestBed,
    // inject
} from '@angular/core/testing';
// import * as Actions from '@core/actions';
import { ModelEffects } from './model-effects.service';
// import { Component, OnDestroy } from '@angular/core';
// import { Subscription } from 'rxjs/Subscription';
// import { Store } from '@ngrx/store';
// import { ApplicationState, Model } from '@shared/models/_index';
// import { ModelBuilder } from '@core/builders/_index';
// import { ModelsService } from '@core/services';
describe('ModelEffectsService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ModelEffects]
        });
    });

    // it('should be created', inject([ModelEffects], (service: ModelEffects) => {
    //   expect(true).toBeTruthy();
    // }));
});
