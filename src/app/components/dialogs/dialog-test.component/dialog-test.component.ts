import { Component, OnInit } from '@angular/core';
import { MdlSnackbarService, MdlDialogReference } from '@angular-mdl/core';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/display/placeholder.js';
import { Application } from '@shared/models/_index';
// import { ApplicationsService } from '@applications/services';
import { DialogBase } from '@shared/base/_index';
// import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { HydroServingState } from '@core/reducers';
import * as fromApplications from '@applications/reducers';
import { GenerateInputAction, TestApplicationAction, SetInputAction } from '@applications/actions';



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
    // public testForm: FormGroup;
    public inputOptions: {};
    public outputOptions: {};
    public input: any = '';
    public output: any = '';
    public curlPath = '';
    // public testTitle: string;
    public requestBody: string;
    // private port;
    // private apiUrl;
    // private signatureName = '';

    constructor(
        // @Inject(injectableTestOptions) data,
        public dialogRef: MdlDialogReference,
        // private fb: FormBuilder,
        // private location: Location,
        // private applicationsService: ApplicationsService,
        private store: Store<HydroServingState>
    ) {
        super(
            dialogRef
        );
        // this.application = data;
        this.application$ = this.store.select(fromApplications.getSelectedApplication);
        this.applicationName$ = this.store.select(fromApplications.getSelectedApplicationName);
        this.applicationId$ = this.store.select(fromApplications.getSelectedApplicationId);
        this.input$ = this.store.select(fromApplications.getSelectedApplicationInput);
        this.output$ = this.store.select(fromApplications.getSelectedApplicationOutput);

        // this.port = environment.production ? window.location.port : environment.port;
        // const path = this.location.prepareExternalUrl(environment.apiUrl).replace('/ui' + environment.apiUrl, environment.apiUrl);
        // this.apiUrl = `${window.location.protocol}//${window.location.hostname}:${this.port}/api/v1/applications`;
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
        this.store.dispatch(new TestApplicationAction);
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
