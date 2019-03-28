import { trigger, transition, animate, style, query, group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as fromModels from '@models/reducers';
import { Store } from '@ngrx/store';
import { IModel } from '@shared/_index';
import { Observable } from 'rxjs';

@Component({
    selector: 'hydro-models-wrapper',
    templateUrl: './models-wrapper.component.html',
    styleUrls: ['./models-wrapper.component.scss'],
    animations: [
        trigger('anim', [
            transition('modelDetail => modelVerDetail', [
                style({
                    position: 'relative',
                }),
                query(':leave, :enter', [
                    style({
                        position: 'absolute',
                        width: '100%',
                        top: 0,
                        left: 0,
                    }),
                ]),
                query(':enter', [
                   style({left: '100%'}),
                ]),
                group([
                    query(':leave', animate('300ms', style({left: '-100%'}))),
                    query(':enter', [
                        animate('300ms', style({left: '0px'})),
                    ]),
                ]),
            ]),
            transition('modelVerDetail => modelDetail', [
                style({
                    position: 'relative',
                }),
                query(':leave, :enter', [
                    style({
                        position: 'absolute',
                        width: '100%',
                        top: 0,
                        left: 0,
                    }),
                ]),
                query(':enter', [
                   style({left: '-100%'}),
                ]),
                group([
                    query(':leave',  animate('300ms', style({left: '100%'}))),
                    query(' :enter', [
                        animate('300ms', style({left: '0px'})),
                    ]),
                ]),
            ]),
        ]),
    ],
})
export class ModelsWrapperComponent implements OnInit {
    models$: Observable<IModel[]>;

    constructor(
        private store: Store<fromModels.ModelsState>
    ) { }

    ngOnInit() {
        this.models$ = this.store.select(fromModels.getAllModels);
    }

    prepareAnimation(outlet: RouterOutlet) {
        return outlet.activatedRouteData && outlet.activatedRouteData.anim;
    }
}
