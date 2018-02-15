import { Component, OnInit, Inject, InjectionToken } from '@angular/core';
import { MdlDialogReference } from '@angular-mdl/core';
// import { MdlSnackbarService } from '@angular-mdl/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/display/placeholder.js';


import { Signature } from '@shared/models/_index';

import { ContractsService } from '@shared/services/_index';

import { DialogBase } from '@shared/base/_index';
// import { environment } from 'environments/environment';
// import { Location } from '@angular/common';


export let injectableId = new InjectionToken<object>('injectableId');

@Component({
    selector: 'hydro-dialog-edit-contract',
    templateUrl: './dialog-edit-contract.component.html',
    styleUrls: ['./dialog-edit-contract.component.scss']
})
export class DialogEditContractComponent extends DialogBase implements OnInit {
    public injectableId;
    public model;
    
    
    public input: {};
    public output: {};
    public testBtn: string;
    public testTitle: string;
    public requestBody: string;
    // private port;
    // private apiUrl;

    public signatures: Signature[];
    public inputOptions: {};
    public outputOptions: {};
    public contractForm: FormGroup;

    constructor( 
        @Inject(injectableId) injectableId,
        public dialogRef: MdlDialogReference,
        private fb: FormBuilder,
        // private mdlSnackbarService: MdlSnackbarService,
        private contractsService: ContractsService
    ) {
        super(
            dialogRef
        );
        this.injectableId = injectableId;

        // this.port = environment.production ? window.location.port : environment.port;
        // const path = this.location.prepareExternalUrl(environment.apiUrl).replace('/ui' + environment.apiUrl, environment.apiUrl);
        // this.apiUrl = `${window.location.protocol}//${window.location.hostname}:${this.port}${path}`;
    }


    ngOnInit() {
        this.createContractForm();
        this.contractsService.getModelContract(this.injectableId)
            .subscribe(data => {
                console.log(data);
                this.signatures = data.signatures;
                console.log(this.signatures);
                this.contractForm.patchValue({
                    inputs: JSON.stringify(this.signatures[0].inputs, null, 2),
                    outputs: JSON.stringify(this.signatures[0].outputs, null, 2)
                });
            })

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
            readOnly: false,
            scrollbarStyle: 'null'
        };
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

    private createContractForm() {
        this.contractForm = this.fb.group({
            inputs: [ ],
            outputs: [ ],
        });
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


    // copiedToClipBoardSuccessfully() {
    //     this.mdlSnackbarService.showSnackbar({
    //         message: 'CURL params were copied out to clipboard successfully',
    //         timeout: 5000
    //     });
    // }

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

    public onSubmit() {
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
