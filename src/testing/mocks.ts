import { Provider } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SELECTED_APPLICATION$, SELECTED_UPD_APPLICATION$, SELECTED_SERVICE } from '@applications/components';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

const MockStore = {
    select: () => of([]),
    dispatch: () => {},
};

const MockRouter = {
    events: of(''),
};

export const MockStoreProvider: Provider = { provide: Store, useValue: MockStore };
export const MockActivatedRouterProvider: Provider = { provide: ActivatedRoute, useValue: {}};
export const MockRouterProvider: Provider = { provide: Router, useValue: MockRouter};
export const MockSelectedApplication: Provider = { provide: SELECTED_APPLICATION$, useValue: of({})};
export const MockSelectedUpdApplication: Provider = { provide: SELECTED_UPD_APPLICATION$, useValue: of({})};
export const MockSelectedServiceProvider: Provider = { provide: SELECTED_SERVICE, useValue: {}};
