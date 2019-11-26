import {
  Component,
  OnInit,
  InjectionToken,
  Inject,
  ViewChild,
} from '@angular/core';

import { MdlSnackbarService } from '@angular-mdl/core';
import { TestStatus, Application } from '@shared/models/_index';
import { Observable } from 'rxjs';

import { ApplicationsFacade } from '@applications/store';
import { DialogService } from '@dialog/dialog.service';
import 'codemirror/addon/display/placeholder.js';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/mode/javascript/javascript.js';
import { CodemirrorComponent } from 'ng2-codemirror';
import {
  map,
  startWith,
  share,
  tap,
} from 'rxjs/operators';

export const SELECTED_APPLICATION = new InjectionToken<Application>(
  'selectedApplication'
);
@Component({
  templateUrl: './dialog-test.component.html',
  styleUrls: ['./dialog-test.component.scss'],
  providers: [MdlSnackbarService],
})
export class DialogTestComponent implements OnInit {
  state$ = this.facade.testingDialogState$;
  inputValid$: Observable<boolean>;
  inputOptions: {};
  outputOptions: {};

  @ViewChild('inputCodeMirror')
  inputCodeMirror: CodemirrorComponent;

  @ViewChild('outputCodeMirror')
  outputCodeMirror: CodemirrorComponent;

  constructor(
    public dialog: DialogService,
    private facade: ApplicationsFacade,
    @Inject(SELECTED_APPLICATION) public application: Application
  ) {
    this.facade.clearTestingDialog();
    this.inputValid$ = this.state$.pipe(
      map(state => {
        try {
          JSON.parse(state.input);
          return true;
        } catch (e) {
          return false;
        }
      }),
      startWith(false),
      share()
    );
  }

  public onClose(): void {
    this.dialog.closeDialog();
  }

  ngOnInit(): void {
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
    this.generateInput();
  }

  public onSubmit(): void {
    this.facade.testApplication(this.application);
  }

  public onChange(input) {
    if (!(input instanceof Event)) {
      this.facade.setInput(input);
      setTimeout(() => {
        if (this.inputCodeMirror) {
          this.inputCodeMirror.instance.refresh();
        }
        if (this.outputCodeMirror) {
          this.outputCodeMirror.instance.refresh();
        }
      }, 0);
    }
  }

  public isFailedTest(status: TestStatus) {
    return status === TestStatus.Failed;
  }

  public isPending(state) {
    return state.status === TestStatus.Pending;
  }

  private generateInput() {
    this.facade.generateInput();
  }
}
