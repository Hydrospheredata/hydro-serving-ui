import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface LoaderState {
  show: boolean;
}

@Injectable()
export class LoaderStateService {
    private loaderSubject: BehaviorSubject<LoaderState> = new BehaviorSubject<LoaderState>({show: false});

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
