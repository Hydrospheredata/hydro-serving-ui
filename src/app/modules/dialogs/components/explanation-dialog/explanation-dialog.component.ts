import { Component, Inject, OnInit } from '@angular/core';
import {
  METHOD,
  MODEL_VERSION_ID,
  OUTPUT_FIELD,
  REQUEST_ID,
} from '@app/modules/root-cause/containers/explanation-button/explanation-button.component';
import { ExplanationFacade } from '@app/modules/root-cause/explanation.facade';
import { Explanation } from '@app/modules/root-cause/models';
import { Observable } from 'rxjs';
import { RootCauseState } from '@app/modules/root-cause/store/state';
import { DialogsService } from '@app/modules/dialogs/dialogs.service';

@Component({
  selector: 'app-explanation-dialog',
  templateUrl: './explanation-dialog.component.html',
  styleUrls: ['./explanation-dialog.component.scss'],
  providers: [RootCauseState, ExplanationFacade],
})
export class ExplanationDialogComponent implements OnInit {
  explanation$: Observable<Explanation>;

  constructor(
    @Inject(MODEL_VERSION_ID) public modelVersionId: number,
    @Inject(REQUEST_ID) public requestId: string,
    @Inject(OUTPUT_FIELD) public outputField: string,
    @Inject(METHOD) public method: string,
    private facade: ExplanationFacade,
    private dialogService: DialogsService,
  ) {
    this.explanation$ = facade.getExplanation();
  }

  ngOnInit() {
    this.facade.createExplanation(
      this.modelVersionId,
      this.requestId,
      this.method,
      this.outputField,
    );
  }

  closeDialog() {
    this.dialogService.closeDialog();
  }
}
