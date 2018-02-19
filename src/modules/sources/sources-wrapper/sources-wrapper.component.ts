import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState, Source } from '@shared/models/_index';



@Component({
    selector: 'hydro-sources-wrapper',
    templateUrl: './sources-wrapper.component.html',
    styleUrls: ['./sources-wrapper.component.scss']
})

export class SourcesWrapperComponent {
    public sidebarTitle = 'Sources';
    public sources: Store<Source[]>;

    constructor(
        private store: Store<AppState>
    ) {
        this.sources = this.store.select('sources');
    }


}
