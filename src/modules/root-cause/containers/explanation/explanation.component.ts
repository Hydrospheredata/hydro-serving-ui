import { Component, OnInit } from '@angular/core';
import { HydroServingState } from '@core/reducers';
import { DialogService } from '@dialog/dialog.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GetExplanation } from '../../actions';
import { Explanation } from '../../models';
import * as rootCauseSelectors from '../../selectors';
@Component({
  templateUrl: 'explanation.component.html',
  styleUrls: ['explanation.component.scss'],
})
export class ExplanationComponent implements OnInit {
  explanation$: Observable<Explanation>;
  isLoading$: Observable<boolean>;
  error$: Observable<string>;
  constructor(
    private store: Store<HydroServingState>,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.explanation$ = this.store.select(rootCauseSelectors.getExplanation);
    this.isLoading$ = this.store.select(rootCauseSelectors.isLoading);
    this.error$ = this.store.select(rootCauseSelectors.getError);

    this.store.dispatch(GetExplanation());
  }

  close() {
    this.dialogService.closeDialog();
  }
}
