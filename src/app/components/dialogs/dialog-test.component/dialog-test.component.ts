import { Component, OnInit, InjectionToken, Inject } from '@angular/core';

import {
    GenerateInputAction,
    TestApplicationAction,
    SetInputAction
} from '@applications/actions';
import { HydroServingState } from '@core/reducers';
import { Store } from '@ngrx/store';

import { MdlSnackbarService, MdlDialogReference } from '@angular-mdl/core';
import { DialogBase } from '@shared/base/_index';
import { TestStatus, Application } from '@shared/models/_index';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import 'codemirror/addon/display/placeholder.js';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/mode/javascript/javascript.js';

export const SELECTED_APPLICATION$ = new InjectionToken<Observable<Application>>('selectedApplication');
@Component({
    selector: 'hydro-dialog-test-model',
    templateUrl: './dialog-test.component.html',
    styleUrls: ['./dialog-test.component.scss'],
    providers: [MdlSnackbarService],
})
export class DialogTestComponent extends DialogBase implements OnInit {
    public input: any = '';
    public inputOptions: {};
    public output: any = '';
    public output$: Observable<string>;
    public outputOptions: {};
    public requestBody: string;

    constructor(
        public dialogRef: MdlDialogReference,
        private store: Store<HydroServingState>,
        @Inject(SELECTED_APPLICATION$) public application$: Observable<Application>
    ) {
        super(
            dialogRef
        );
    }

    public close(): void {
        this.dialogRef.hide();
    }

    ngOnInit(): void {
        this.inputOptions = {
            matchBrackets: true,
            autoCloseBrackets: true,
            mode: { name: 'javascript', json: true },
            lineWrapping: true,
            readOnly: false,
            scrollbarStyle: 'null',
            onChange: val => { console.log(val); },
        };
        this.outputOptions = {
            matchBrackets: true,
            autoCloseBrackets: true,
            mode: { name: 'javascript', json: true },
            lineWrapping: true,
            readOnly: true,
            scrollbarStyle: 'null',
        };

        this.generateInput();
    }

    public onSubmit(): void {
        this.application$.pipe(take(1)).subscribe(
            application => this.store.dispatch(new TestApplicationAction(application))
        );
    }

    public onChange(input) {
        if (!(input instanceof Event)) {
            this.store.dispatch(new SetInputAction(input));
        }
    }

    public isFailedTest(status: TestStatus) {
        return status === TestStatus.Failed;
    }

    public isValidInput(input): boolean {
        try {
            JSON.parse(input);
            return true;
        } catch (e) {
            return false;
        }
    }

    private generateInput() {
        this.store.dispatch(new GenerateInputAction());
    }
}
