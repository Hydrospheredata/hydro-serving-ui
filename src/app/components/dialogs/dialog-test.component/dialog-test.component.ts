import { Component, OnInit, Inject, InjectionToken, HostListener } from '@angular/core';
import { MdlDialogReference, MdlDialogService } from '@angular-mdl/core';
import { MdlSnackbarService } from '@angular-mdl/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/display/placeholder.js';
import { Model, ModelService, Service } from '@shared/models/_index';
import { ServicesService, ModelServicesService, ModelRuntimesService } from '@shared/services/_index';
import { DialogBase } from '@shared/base/_index';
import { environment } from 'environments/environment';
import { Location } from '@angular/common';


export let injectableModelBuildOptions = new InjectionToken<object>('injectableModelBuildOptions');

@Component({
  selector: 'hydro-dialog-test-model',
  templateUrl: './dialog-test.component.html',
  styleUrls: ['./dialog-test.component.scss'],
  providers: [MdlSnackbarService, FormBuilder]
})
export class DialogTestComponent extends DialogBase implements OnInit {
  public data;
  public model;
  public testForm: FormGroup;
  public codeMirrorInputOptions: {};
  public codeMirrorOutputOptions: {};
  public input: {};
  public output: {};
  public testBtn: string;
  public testTitle: string;
  public requestBody: string;
  private port;
  private apiUrl;

  constructor( @Inject(injectableModelBuildOptions) data,
    public dialogRef: MdlDialogReference,
    private fb: FormBuilder,
    private mdlSnackbarService: MdlSnackbarService,
    private modelServicesService: ModelServicesService,
    private modelRuntimesService: ModelRuntimesService,
    private location: Location,
    private servicesService: ServicesService
  ) {
    super(
        dialogRef
    );
    this.model = data;

    this.port = environment.production ?
    window.location.port ? `:${window.location.port}` : ''
    : `:${environment.port}`;
    const path = this.location.prepareExternalUrl(environment.apiUrl).replace('/ui' + environment.apiUrl, environment.apiUrl);
    this.apiUrl = `${window.location.protocol}//${window.location.hostname}${this.port}${path}`;
  }


  ngOnInit() {
    this.codeMirrorInputOptions = {
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


    if (this.model instanceof Service) {
      this.input = [{}];
      this.testTitle = `Test service "${this.model.serviceName}"`;
      this.testBtn = `Test service`;
      this.createTestForm();
    } else {
      // TODO: come up with better way of sending async data into formbuilder
      this.modelRuntimesService.generateInputs(this.model.modelRuntime.id).first()
        .subscribe(data => {
          this.input = data;
          this.testTitle = `Test model "${this.model.modelRuntime.modelName}"`;
          this.testBtn = 'Test model';
          this.createTestForm();
        });
    }


  }



  private createCURLString(form) {
    let path = '';
    let payload = '';
    payload = JSON.stringify(this.createTestOptions(form));

    if (this.model instanceof Service) {
      path = `${this.apiUrl}/applications/serve/${this.model.serviceName}`;
    } else {
      path = `${this.apiUrl}/modelService/serve/${this.model.modelRuntime.modelName}/${this.model.modelRuntime.modelVersion}`;
    }
    return `curl -X POST --header 'Content-Type: application/json' -d '${payload}' '${path}'`;
  }

  private createTestForm() {
    this.testForm = this.fb.group({
      data: [JSON.stringify(this.input, null, 2), [Validators.required, this.validateInput]],
    });
    this.requestBody = this.createCURLString(this.testForm);
    this.testForm.valueChanges.subscribe(form => {
      this.requestBody = this.createCURLString(this.testForm);
    });
  }

  private extractModelInputFields(model): string {
    return '{}';
  }

  private validateInput(input) {
    try {
      JSON.parse(input.value);
    } catch (e) {
      return {
        validateInput: {
          valid: false
        }
      };
    }
    return null;
  }


  copiedToClipBoardSuccessfully(inputTarget) {
    this.mdlSnackbarService.showSnackbar({
      message: `CURL params were copied out to clipboard successfully`,
      timeout: 5000
    });
  }

  public createTestOptions(form) {
    const controls = form.controls;
    let data = '';
    try {
      data = JSON.parse(controls.data.value);
    } catch (e) {
      data = '';
    }
    const testOptions = data;
    return testOptions;
  }

  submitTestForm(form) {
    let apiUrl;
    let snackbarSuccessMsg: string;
    let entityName: string;
    let entityVersion: string;
    const testOptions = this.createTestOptions(form);
    if (this.model instanceof Service) {
      apiUrl = this.servicesService.serveService.bind(this.servicesService);
      snackbarSuccessMsg = 'Service test was successful';
      entityName = this.model.serviceName;
      entityVersion = null;
    } else {
      apiUrl = this.modelServicesService.serveModelService.bind(this.modelServicesService);
      snackbarSuccessMsg = 'Model test was successful';
      entityName = this.model.modelRuntime.modelName;
      console.log(this.model.modelRuntime);
      entityVersion = this.model.modelRuntime.modelVersion;
    }
    console.log(JSON.stringify(testOptions));
    console.log(entityVersion)
    apiUrl(testOptions, entityName, entityVersion)
      .subscribe(res => {
        this.output = JSON.stringify(res, undefined, 2);
        this.mdlSnackbarService.showSnackbar({
          message: snackbarSuccessMsg,
          timeout: 5000
        });
      },
      (error) => {
        this.mdlSnackbarService.showSnackbar({
          message: `Error: ${error}`,
          timeout: 5000
        });
      });
  }
}
