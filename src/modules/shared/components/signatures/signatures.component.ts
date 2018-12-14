
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {filter} from 'rxjs/operators';

import { GetModelVersionSignaturesAction } from '@core/actions';
import { HydroServingState } from '@core/reducers';
import * as fromModels from '@models/reducers';
import { Store } from '@ngrx/store';
import { Signature, ModelBuild } from '@shared/models/_index';
import { Subscription ,  Observable } from 'rxjs';

@Component({
    selector: 'hydro-signatures',
    templateUrl: './signatures.component.html',
    styleUrls: ['./signatures.component.scss'],
})
export class SignaturesComponent implements OnInit, OnDestroy {

    @Input() modelId: number;
    @Input() isEditable: boolean;
    public signatures: Signature[];
    public isReadOnly = true;
    public signaturesForm: FormGroup;
    private signaturesSub: Subscription;
    private buildSub: Subscription;
    private build$: Observable<ModelBuild>;

    constructor(
        public fb: FormBuilder,
        private store: Store<HydroServingState>
    ) {
        this.build$ = this.store.select(fromModels.getSelectedBuild);
    }

    ngOnInit() {
        this.buildSub = this.build$.pipe(filter(_ => _ != null)).subscribe(build => {
            this.store.dispatch(new GetModelVersionSignaturesAction(build.modelVersion.id));
        });
        this.signaturesSub = this.store.select('signatures')
            .subscribe(signatures => {
                this.signatures = signatures;
            });
    }

    ngOnDestroy() {
        if (this.signaturesSub) {
            this.signaturesSub.unsubscribe();
        }

        if (this.buildSub) {
            this.buildSub.unsubscribe();
        }
    }
}
