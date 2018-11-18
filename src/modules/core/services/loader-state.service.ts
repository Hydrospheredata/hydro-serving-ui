import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface LoaderState {
  show: boolean;
}

@Injectable()
export class LoaderStateService {
    private loaderSubject: Subject<LoaderState> = new Subject<LoaderState>();

    get loaderState() {
        return this.loaderSubject.asObservable();
    }

    showLoader() {
        this.loaderSubject.next({show: true} as LoaderState);
    }

    hideLoader() {
        this.loaderSubject.next({show: false} as LoaderState);
    }

}
