import { Provider } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  SELECTED_APPLICATION,
  SELECTED_MODEL_VARIANT,
  LATEST_MODEL_VERSION,
} from '@applications/components';
import { Store } from '@ngrx/store';
import { MockModelVersion2Model1 } from '@testing/factories/modelVersion';
import { of } from 'rxjs';

const MockStore = {
  select: () => of([]),
  dispatch: () => {},
};

const MockRouter = {
  events: of(''),
};

export const MockStoreProvider: Provider = {
  provide: Store,
  useValue: MockStore,
};
export const MockActivatedRouterProvider: Provider = {
  provide: ActivatedRoute,
  useValue: {},
};
export const MockRouterProvider: Provider = {
  provide: Router,
  useValue: MockRouter,
};
export const MockSelectedApplication: Provider = {
  provide: SELECTED_APPLICATION,
  useValue: {},
};
export const MockSelectedModelVariantProvider: Provider = {
  provide: SELECTED_MODEL_VARIANT,
  useValue: {},
};
export const MockLatestModelVersionId: Provider = {
  provide: LATEST_MODEL_VERSION,
  useValue: MockModelVersion2Model1,
};
