import { Component, InjectionToken, Inject } from '@angular/core';

import { HydroServingState } from '@core/reducers';
import { DeleteModelAction } from '@models/actions';
import { Store } from '@ngrx/store';

import { DialogService } from '@dialog/dialog.service';
import { IModel } from '@shared/_index';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

export const SELECTED_MODEL$ = new InjectionToken<Observable<IModel>>('selected model');
@Component({
    selector: 'hydro-dialog-delete-model',
    templateUrl: './dialog-delete-model.component.html',
})
export class DialogDeleteModelComponent {
    private model: IModel;
    get name(): string {
        return this.model.name;
    }

    constructor(
        public dialog: DialogService,
        private store: Store<HydroServingState>,
        @Inject(SELECTED_MODEL$) private model$: Observable<IModel>
    ) {
        this.model$.pipe(
            take(1),
            tap( model => this.model = model)
        ).subscribe();
    }

    public onClose(): void {
        this.dialog.closeDialog();
    }

    public onDelete(): void {
        this.store.dispatch(new DeleteModelAction(this.model.id));
        this.onClose();
    }
}
