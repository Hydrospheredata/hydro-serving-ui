import { Component, OnInit, Inject, InjectionToken, HostListener } from '@angular/core';
import { MdlDialogReference, MdlDialogService } from '@angular-mdl/core';
import { MdlSnackbarService } from '@angular-mdl/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BuildModelService } from '@services/build-model.service';
import { ModelStore } from '@stores/model.store';
// todo fix paths
import '../../../../../node_modules/codemirror/mode/javascript/javascript.js';
import '../../../../../node_modules/codemirror/addon/edit/matchbrackets.js';
import '../../../../../node_modules/codemirror/addon/edit/closebrackets.js';
import '../../../../../node_modules/codemirror/addon/display/placeholder.js';

export let injectableModelBuildOptions = new InjectionToken<object>('injectableModelBuildOptions');

@Component({
  selector: 'hydro-dialog-test-model',
  templateUrl: './dialog-test-model.component.html',
  styleUrls: ['./dialog-test-model.component.scss'],
  providers: [MdlSnackbarService, FormBuilder, BuildModelService]
})
export class DialogTestModelComponent implements OnInit {
  public data;
  public model;
  public testModelForm: FormGroup;
  public codeMirrorInputOptions: {};
  public codeMirrorOutputOptions: {};
  public output: {};

  constructor(@Inject(injectableModelBuildOptions) data,
              private buildModelService: BuildModelService,
              public dialogRef: MdlDialogReference,
              private fb: FormBuilder,
              private modelStore: ModelStore,
              private mdlSnackbarService: MdlSnackbarService
  ) {
    this.model = data;
  }

  ngOnInit() {
    this.createTestModelForm();
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

  createTestModelForm() {
    this.testModelForm = this.fb.group({
      data: ['[{}]', [Validators.required]],
      path: ['/serve', [Validators.required]],
    });
  }

  submitTestModelForm(form) {
    const controls = form.controls;
    const data = JSON.parse(controls.data.value);
    const testOptions = {
      id: this.model.id,
      path: controls.path.value,
      data: data
    };

    this.modelStore.testModel(JSON.stringify(testOptions))
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
