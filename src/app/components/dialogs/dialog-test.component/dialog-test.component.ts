import { Component, OnInit, Inject, InjectionToken, HostListener } from '@angular/core';
import { MdlDialogReference, MdlDialogService } from '@angular-mdl/core';
import { MdlSnackbarService } from '@angular-mdl/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/display/placeholder.js';
import { Model, ModelService, Service } from '@shared/models/_index';
import { ServicesService, ModelServicesService } from '@shared/services/_index';
import { environment } from 'environments/environment';
import { Location } from '@angular/common';


export let injectableModelBuildOptions = new InjectionToken<object>('injectableModelBuildOptions');

@Component({
  selector: 'hydro-dialog-test-model',
  templateUrl: './dialog-test.component.html',
  styleUrls: ['./dialog-test.component.scss'],
  providers: [MdlSnackbarService, FormBuilder]
})
export class DialogTestComponent implements OnInit {
  public data;
  public model;
  public testForm: FormGroup;
  public codeMirrorInputOptions: {};
  public codeMirrorOutputOptions: {};
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
    private location: Location,
    private servicesService: ServicesService
  ) {
    this.model = data;

    this.port = environment.production ? window.location.port : environment.port;
    const path = this.location.prepareExternalUrl(environment.apiUrl).replace('/ui' + environment.apiUrl, environment.apiUrl);
    this.apiUrl = `${window.location.protocol}//${window.location.hostname}:${this.port}${path}`;
  }


  ngOnInit() {
    if (!this.model.id || this.model instanceof Model) {
      this.testTitle = `Test model "${this.model.modelRuntime.modelName}"`;
      this.testBtn = 'Test model';
    } else {
      this.testTitle = `Test service "${this.model.serviceName}"`;
      this.testBtn = `Test service`;
    }
    this.createTestForm();
    this.requestBody = this.createCURLString(this.testForm);
    this.testForm.valueChanges.subscribe(form => {
      console.log(this.testForm);
      this.requestBody = this.createCURLString(this.testForm);
    });
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

  }

  private createCURLString(form) {
    let path = '';
    let payload = '';
    payload = JSON.stringify(this.createTestOptions(form));

    if (this.model instanceof Service) {
      path = `${this.apiUrl}/weightedServices/serve`;
    } else {
      path = `${this.apiUrl}/modelService/serve`;
    }
    return `curl -X POST --header 'Content-Type: application/json'
    -d '${payload}'
    '${path}'`;
  }

  @HostListener('document:keydown.escape')
  public onEsc(): void {
    this.dialogRef.hide();
  }

  private createTestForm() {
    this.testForm = this.fb.group({
      data: [this.extractModelInputFields(this.model), [Validators.required, this.validateInput]],
      path: ['/serve', [Validators.required]],
    });
  }

  private extractModelInputFields(model): string {
    let inputFields;
    if (model.inputFields) {
      inputFields = model.inputFields;
    } else if (model.modelRuntime && model.modelRuntime.inputFields) {
      inputFields = model.modelRuntime.inputFields;
    } else {
      return JSON.stringify([{}]);
    }
    const reducedFields = inputFields.reduce((payload, field) => {
      payload[field] = '';
      return payload;
    }, {});
    return JSON.stringify([reducedFields], undefined, 2);
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
    const testOptions = {
      id: this.model instanceof Service ? this.model.id : this.model.serviceId,
      path: controls.path.value,
      data: data
    };
    return testOptions;
  }

  submitTestForm(form) {
    let apiUrl;
    let snackbarSuccessMsg;
    const testOptions = this.createTestOptions(form);
    if (this.model instanceof Service) {
      apiUrl = this.servicesService.serveService.bind(this.servicesService);
      snackbarSuccessMsg = 'Service test was successful';
    } else {
      apiUrl = this.modelServicesService.serveModelService.bind(this.modelServicesService);
      snackbarSuccessMsg = 'Model test was successful';
    }

    apiUrl(JSON.stringify(testOptions))
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
