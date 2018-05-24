import { Component, OnInit, Inject, InjectionToken } from '@angular/core';
import { MdlSnackbarService, MdlDialogReference } from '@angular-mdl/core';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/display/placeholder.js';
import { Application } from '@shared/models/_index';
import { ApplicationsService } from '@applications/services';
import { DialogBase } from '@shared/base/_index';
import { environment } from 'environments/environment';


export let injectableTestOptions = new InjectionToken<Application>('injectableTestOptions');

@Component({
    selector: 'hydro-dialog-test-model',
    templateUrl: './dialog-test.component.html',
    styleUrls: ['./dialog-test.component.scss'],
    providers: [MdlSnackbarService]
})
export class DialogTestComponent extends DialogBase implements OnInit {
    public data;
    public application: Application;
    // public testForm: FormGroup;
    public inputOptions: {};
    public outputOptions: {};
    public input: any = '';
    public output: any = '';
    public curlPath = '';
    public testBtn: string;
    public testTitle: string;
    public requestBody: string;
    private port;
    private apiUrl;
    private signatureName = '';

    constructor(
        @Inject(injectableTestOptions) data,
        public dialogRef: MdlDialogReference,
        // private fb: FormBuilder,
        private mdlSnackbarService: MdlSnackbarService,
        // private location: Location,
        private applicationsService: ApplicationsService
    ) {
        super(
            dialogRef
        );
        this.application = data;

        this.port = environment.production ? window.location.port : environment.port;
        // const path = this.location.prepareExternalUrl(environment.apiUrl).replace('/ui' + environment.apiUrl, environment.apiUrl);
        this.apiUrl = `${window.location.protocol}//${window.location.hostname}:${this.port}/api/v1/applications`;
    }


    ngOnInit() {
        this.inputOptions = {
            matchBrackets: true,
            autoCloseBrackets: true,
            mode: { name: 'javascript', json: true },
            lineWrapping: true,
            readOnly: false,
            scrollbarStyle: 'null'
        };
        this.outputOptions = {
            matchBrackets: true,
            autoCloseBrackets: true,
            mode: { name: 'javascript', json: true },
            lineWrapping: true,
            readOnly: true,
            scrollbarStyle: 'null'
        };

        this.signatureName = this.application.contract.match(/signature_name: \"(.*)\"\n/)[1];
        this.testTitle = `Test application "${this.application.name}"`;
        this.testBtn = 'Test application';
        this.generateInputs();
        this.createCURLString();
    }

    private generateInputs() {
        this.applicationsService.generateInputs(this.application.id, this.signatureName).first()
            .subscribe(data => {
                console.log(data);
                this.input = JSON.stringify(data, undefined, 2);
            });
    }

    public createCURLString() {
        // let path = '';
        // let payload = '';
        // payload = JSON.stringify(this.createTestOptions(form));
        // path = `${this.apiUrl}/serve/${this.application.id}/${this.signatureName}`;
        const url = `${this.apiUrl}/serve/${this.application.id}/${this.signatureName}`;
        this.curlPath = `curl -X POST --header 'Content-Type: application/json' -d ${url}`;
    }

    // private validateInput(input) {
    //     try {
    //         JSON.parse(input.value);
    //     } catch (e) {
    //         return {
    //             validateInput: {
    //                 valid: false
    //             }
    //         };
    //     }
    //     return null;
    // }


    copiedToClipBoardSuccessfully() {
        this.mdlSnackbarService.showSnackbar({
            message: 'CURL params were copied out to clipboard successfully',
            timeout: 5000
        });
    }

    // public createTestOptions(form) {
    //     const controls = form.controls;
    //     let data = '';
    //     try {
    //         data = JSON.parse(controls.data.value);
    //     } catch (e) {
    //         data = '';
    //     }
    //     const testOptions = data;
    //     return testOptions;
    // }

    onSubmit() {
        // let apiUrl;
        // let snackbarSuccessMsg: string;
        // let entityName: string;
        // const testOptions = this.createTestOptions(form);
        // if (this.model instanceof Application) {
        //     apiUrl = this.applicationsService.serveService.bind(this.applicationsService);
        //     snackbarSuccessMsg = 'Application test was successful';
        //     entityName = this.model.name;
        // } else {
        //     // apiUrl = this.modelServicesService.serveModelService.bind(this.modelServicesService);
        //     snackbarSuccessMsg = 'Model test was successful';
        //     entityName = this.model.modelRuntime.modelName;
        // }

        this.applicationsService.serveService(JSON.parse(this.input), this.application.id, this.signatureName)
            .subscribe(res => {
                this.output = JSON.stringify(res, undefined, 2);
                this.mdlSnackbarService.showSnackbar({
                    message: 'Application test was successful',
                    timeout: 5000
                });
            },
                (error) => {
                    this.mdlSnackbarService.showSnackbar({
                        message: `Error: ${error}`,
                        timeout: 5000
                    });
                });

        // apiUrl(testOptions, entityName)
        //     .subscribe(res => {
        //         this.output = JSON.stringify(res, undefined, 2);
        //         this.mdlSnackbarService.showSnackbar({
        //             message: snackbarSuccessMsg,
        //             timeout: 5000
        //         });
        //     },
        //     (error) => {
        //         this.mdlSnackbarService.showSnackbar({
        //             message: `Error: ${error}`,
        //             timeout: 5000
        //         });
        //     });
    }
}
