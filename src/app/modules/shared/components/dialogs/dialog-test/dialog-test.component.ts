import { Component, OnInit, Inject, InjectionToken, HostListener } from '@angular/core';
import { MdlDialogReference, MdlDialogService } from '@angular-mdl/core';
import { MdlSnackbarService } from '@angular-mdl/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ModelStore } from '@stores/model.store';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/display/placeholder.js';
import { Model } from '@shared/models/_index';
import { ModelServiceStore } from '@stores/model-service.store';

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

  constructor(@Inject(injectableModelBuildOptions) data,
              public dialogRef: MdlDialogReference,
              private fb: FormBuilder,
              private modelStore: ModelStore,
              private mdlSnackbarService: MdlSnackbarService,
              private modelServiceStore: ModelServiceStore
  ) {
    this.model = data;
  }

  ngOnInit() {
    this.createTestForm();
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

  @HostListener('keydown.esc')
  public onEsc(): void {
    this.dialogRef.hide();
  }

  private createTestForm() {
    this.testForm = this.fb.group({
      data: [this.extractModelInputFields(this.model), [Validators.required]],
      path: ['/serve', [Validators.required]],
    });
  }

  private extractModelInputFields(model): string {
    if (!model['inputFields']) {
      return JSON.stringify([{}]);
    }
    let inputFields: object[] = [];
    for (let i = 0; i < model['inputFields'].length; i++) {
      inputFields.push({ [model['inputFields'][i]]: '' });
    }
    return JSON.stringify(inputFields, undefined, 2);
  }

  submitTestForm(form) {
    let apiUrl;
    const controls = form.controls;
    const data = JSON.parse(controls.data.value);
    const testOptions = {
      id: this.model.id || this.model.serviceId,
      path: controls.path.value,
      data: data
    };

    if (this.model instanceof Model) {
      apiUrl = this.modelStore.testModel.bind(this.modelStore);
    } else {
      apiUrl = this.modelServiceStore.serve.bind(this.modelServiceStore);
    }

    apiUrl(JSON.stringify(testOptions))
      .subscribe(res => {
        this.output = JSON.stringify(res, undefined, 2);
          this.mdlSnackbarService.showSnackbar({
            message: `Model test was successful`,
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
