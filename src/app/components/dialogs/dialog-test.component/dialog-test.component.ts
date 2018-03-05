import { Component, OnInit, Inject, InjectionToken } from '@angular/core';
import { MdlDialogReference } from '@angular-mdl/core';
import { MdlSnackbarService } from '@angular-mdl/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/display/placeholder.js';
import { Application } from '@shared/models/_index';
// import { ApplicationsService } from '@shared/services/_index';
import { DialogBase } from '@shared/base/_index';
import { environment } from 'environments/environment';
import { Location } from '@angular/common';


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
    public testForm: FormGroup;
    public inputOptions: {};
    public codeMirrorOutputOptions: {};
    public input: {};
    public output: {};
    public testBtn: string;
    public testTitle: string;
    public requestBody: string;
    private port;
    private apiUrl;

    constructor( 
        @Inject(injectableTestOptions) data,
        public dialogRef: MdlDialogReference,
        private fb: FormBuilder,
        private mdlSnackbarService: MdlSnackbarService,
        private location: Location,
        // private applicationsService: ApplicationsService
    ) {
        super(
            dialogRef
        );
        this.application = data;

        this.port = environment.production ? window.location.port : environment.port;
        const path = this.location.prepareExternalUrl(environment.apiUrl).replace('/ui' + environment.apiUrl, environment.apiUrl);
        this.apiUrl = `${window.location.protocol}//${window.location.hostname}:${this.port}${path}`;
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
        this.codeMirrorOutputOptions = {
            matchBrackets: true,
            autoCloseBrackets: true,
            mode: { name: 'javascript', json: true },
            lineWrapping: true,
            readOnly: true,
            scrollbarStyle: 'null'
        };


        this.input = [{}];
        this.testTitle = `Test application "${this.application.name}"`;
        this.testBtn = 'Test application';
        this.createTestForm();

        // if (this.model instanceof Application) {
        //     this.input = [{}];
        //     this.testTitle = `Test service "${this.model.name}"`;
        //     this.testBtn = 'Test service';
        //     this.createTestForm();
        // } else {
        //     // TODO: come up with better way of sending async data into formbuilder
        //     // this.modelRuntimesService.generateInputs(this.model.modelRuntime.id).first()
        //     //     .subscribe(data => {
        //     //         this.input = data;
        //     //         this.testTitle = `Test model "${this.model.modelRuntime.modelName}"`;
        //     //         this.testBtn = 'Test model';
        //     //         this.createTestForm();
        //     //     });
        // }


    }

    private createTestForm() {
        this.testForm = this.fb.group({
            data: [ '' ],
        });
        // this.requestBody = this.createCURLString(this.testForm);
        // this.testForm.valueChanges.subscribe(() => {
        //     this.requestBody = this.createCURLString(this.testForm);
        // });
    }

    // private createCURLString(form) {
    //     let path = '';
    //     let payload = '';
    //     payload = JSON.stringify(this.createTestOptions(form));

    //     if (this.model instanceof Application) {
    //         path = `${this.apiUrl}/weightedServices/serveByName/${this.model.name}`;
    //     } else {
    //         path = `${this.apiUrl}/modelService/serve/${this.model.modelRuntime.modelName}`;
    //     }
    //     return `curl -X POST --header 'Content-Type: application/json' -d '${payload}' '${path}'`;
    // }

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

    submitTestForm() {
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
