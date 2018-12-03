import { Component, OnInit, InjectionToken, Inject } from '@angular/core';

import {
    GenerateInputAction,
    TestApplicationAction,
    SetInputAction
} from '@applications/actions';
import { HydroServingState } from '@core/reducers';
import { Store } from '@ngrx/store';

import { MdlSnackbarService } from '@angular-mdl/core';
import { TestStatus, Application } from '@shared/models/_index';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { DialogService } from '@dialog/dialog.service';
import 'codemirror/addon/display/placeholder.js';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/mode/javascript/javascript.js';

export const SELECTED_APPLICATION$ = new InjectionToken<Observable<Application>>('selectedApplication');
@Component({
    selector: '',
    templateUrl: './dialog-test.component.html',
    styleUrls: ['./dialog-test.component.scss'],
    providers: [MdlSnackbarService],
})
export class DialogTestComponent implements OnInit {
    public input: any = '';
    public inputOptions: {};
    public output: any = '';
    public output$: Observable<string>;
    public outputOptions: {};
    public requestBody: string;

    constructor(
        public dialog: DialogService,
        private store: Store<HydroServingState>,
        @Inject(SELECTED_APPLICATION$) public application$: Observable<Application>
    ) {
    }

    public onClose(): void {
        this.dialog.closeDialog();
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
