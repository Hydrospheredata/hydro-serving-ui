import {
  Component,
  OnInit,
  InjectionToken,
  Inject,
  ViewChild,
} from '@angular/core';

import { MdlSnackbarService } from '@angular-mdl/core';
import { SnackbarService } from '@app/core/snackbar.service';
import { TestApplicationFacade } from './test-application.facade';
import { TestStatus, Application } from '@app/core/data/types';
import { Observable, concat, Subject } from 'rxjs';

import { ApplicationsFacade } from '@app/core/facades/applications.facade';
import { DialogsService } from '@app/modules/dialogs/dialogs.service';

import 'codemirror/addon/display/placeholder.js';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/mode/javascript/javascript.js';

import { CodemirrorComponent } from '@ctrl/ngx-codemirror';
import { tap } from 'rxjs/operators';

export const SELECTED_APPLICATION = new InjectionToken<Application>(
  'selectedApplication'
);
@Component({
  templateUrl: './dialog-test.component.html',
  styleUrls: ['./dialog-test.component.scss'],
  providers: [MdlSnackbarService, TestApplicationFacade],
})
export class DialogTestComponent implements OnInit {
  inputValid$: Observable<boolean>;

  inputOptions: {};
  outputOptions: {};

  input: string = '';
  output: Observable<string>;
  isValidInput: boolean = true;
  generatingInput: boolean = false;
  generatingInputError: string = '';

  @ViewChild('inputCodeMirror', { static: true })
  inputCodeMirror: CodemirrorComponent;

  @ViewChild('outputCodeMirror', { static: true })
  outputCodeMirror: CodemirrorComponent;

  constructor(
    private snackbar: SnackbarService,
    public dialog: DialogsService,
    private facade: ApplicationsFacade,
    private testAppFacade: TestApplicationFacade,
    @Inject(SELECTED_APPLICATION) public application: Application
  ) {
    this.inputOptions = {
      matchBrackets: true,
      autoCloseBrackets: true,
      mode: { name: 'javascript', json: true },
      lineWrapping: true,
      readOnly: false,
      scrollbarStyle: 'null',
    };
    this.outputOptions = {
      matchBrackets: true,
      autoCloseBrackets: true,
      mode: { name: 'javascript', json: true },
      lineWrapping: true,
      readOnly: true,
      scrollbarStyle: 'null',
    };
  }

  public onClose(): void {
    this.dialog.closeDialog();
  }

  ngOnInit(): void {
    this.output = this.testAppFacade.getOutput();

    this.testAppFacade
      .generateInput()
      .pipe(tap(() => (this.generatingInput = true)))
      .subscribe(
        generatedInput => {
          this.generatingInput = false;
          this.input = JSON.stringify(generatedInput, undefined, 2);
        },
        err => {
          this.generatingInput = false;
          this.input = JSON.stringify({});
          this.generatingInputError = err;
        }
      );
  }

  public onSubmit(): void {
    this.testAppFacade.testApplication(this.input);
  }

  public onChange(input) {
    console.log('change');
    try {
      JSON.parse(this.input);
      this.isValidInput = true;
    } catch (err) {
      this.isValidInput = false;
    }
  }

  public isFailedTest(status: TestStatus) {
    return status === TestStatus.Failed;
  }

  public isPending(state) {
    return state.status === TestStatus.Pending;
  }
}
