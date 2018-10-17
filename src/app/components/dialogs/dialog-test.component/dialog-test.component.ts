import { Component, OnInit } from '@angular/core';
import { MdlSnackbarService, MdlDialogReference } from '@angular-mdl/core';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/display/placeholder.js';
import { TestStatus, Application } from '@shared/models/_index';
import { DialogBase } from '@shared/base/_index';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { HydroServingState } from '@core/reducers';
import * as fromApplications from '@applications/reducers';
import { GenerateInputAction, TestApplicationAction, SetInputAction } from '@applications/actions';
import { environment } from '@environments/environment.prod';
import { of } from 'rxjs/observable/of';

@Component({
    selector: 'hydro-dialog-test-model',
    templateUrl: './dialog-test.component.html',
    styleUrls: ['./dialog-test.component.scss'],
    providers: [MdlSnackbarService]
})
export class DialogTestComponent extends DialogBase implements OnInit {
    public data;
    public application$: Observable<Application>;
    public input$: Observable<string>;
    public output$: Observable<string>;
    public applicationName$: Observable<string>;
    public applicationId$: Observable<number>;
    public curl$: Observable<string>;
    public testStatus$: Observable<TestStatus>;
    
    public inputOptions: {};
    public outputOptions: {};
    public input: any = '';
    public isValidInput$: Observable<boolean>;
    public output: any = '';
    public curlPath = '';
    public requestBody: string;
    public grpc = 'grpc';

    constructor(
        public dialogRef: MdlDialogReference,
        private store: Store<HydroServingState>
    ) {
        super(
            dialogRef
        );
        this.application$ = this.store.select(fromApplications.getSelectedApplication);
        this.applicationName$ = this.store.select(fromApplications.getSelectedApplicationName);
        this.applicationId$ = this.store.select(fromApplications.getSelectedApplicationId);
        this.input$ = this.store.select(fromApplications.getSelectedApplicationInput);
        this.output$ = this.store.select(fromApplications.getSelectedApplicationOutput);
        this.testStatus$ = this.store.select(fromApplications.getSelectedApplicationTestStatus);

        this.curl$ = this.application$.switchMap(
            application => this.createCurl(application)
        )

        this.isValidInput$ = this.input$.switchMap(input => {
            try {
                JSON.parse(input);
                return of(true)
            } catch(e) {
                return of(false)
            }
        })
    }

    public copyToClipboard(div) {
        const el = document.createElement('textarea');
        el.value = div.innerText;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }

    public close(){
        this.dialogRef.hide();
    }

    private createCurl(application: Application): Observable<string> {
        const { host , port, apiUrl } = environment;
        const headers = `--header 'Content-Type: application/json' --header 'Accept: application/json'`
        const { input, id, name } = application;
        const url = `${host}:${port}${apiUrl}/applications/serve/${id}/${name}`;
        return of(`curl -X POST ${headers} -d '${input}' '${url}'`);
    }

    ngOnInit() {
        this.inputOptions = {
            matchBrackets: true,
            autoCloseBrackets: true,
            mode: { name: 'javascript', json: true },
            lineWrapping: true,
            readOnly: false,
            scrollbarStyle: 'null',
            onChange: (val) => {
                console.log(val);
            }
        };
        this.outputOptions = {
            matchBrackets: true,
            autoCloseBrackets: true,
            mode: { name: 'javascript', json: true },
            lineWrapping: true,
            readOnly: true,
            scrollbarStyle: 'null'
        };

        this.generateInput();
    }

    public onSubmit() {
        this.application$.take(1).subscribe(
            application => this.store.dispatch(new TestApplicationAction(application))
        )
    }

    public onChange(input) {
        if (!(input instanceof Event)) {
            this.store.dispatch(new SetInputAction(input));
        }
    }

    private generateInput() {
        this.store.dispatch(new GenerateInputAction);
    }
}
