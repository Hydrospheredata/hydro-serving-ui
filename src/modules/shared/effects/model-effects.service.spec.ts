import { TestBed, inject } from '@angular/core/testing';
import * as Actions from '@shared/actions/_index';
import { ModelEffectsService } from './model-effects.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { AppState, Model } from '@shared/models/_index';
import { ModelBuilder } from '@shared/builders/_index';
import { ModelsService } from '@shared/services/_index';
describe('ModelEffectsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModelEffectsService]
    });
  });

  it('should be created', inject([ModelEffectsService], (service: ModelEffectsService) => {
    // expect(service).toBeTruthy();
  }));
});
