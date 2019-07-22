import { Component, OnInit, InjectionToken, Inject } from '@angular/core';
import { DialogService } from '@dialog/dialog.service';
import { ExplanationRequestBody } from '@rootcause/interfaces';
import { RootCauseFacade } from '@rootcause/state/root-cause.facade';
import { Observable } from 'rxjs';
import { Explanation } from '../../models';

export const EXPLANATION_REQUEST_BODY = new InjectionToken<
  ExplanationRequestBody
>('');
@Component({
  templateUrl: 'explanation.component.html',
  styleUrls: ['explanation.component.scss'],
})
export class ExplanationComponent implements OnInit {
  explanation$: Observable<Explanation>;
  isLoading$: Observable<boolean>;
  error$: Observable<string>;
  constructor(
    private facade: RootCauseFacade,
    private dialogService: DialogService,
    @Inject(EXPLANATION_REQUEST_BODY) private requestBody: ExplanationRequestBody
  ) {}

  ngOnInit(): void {
    this.explanation$ = this.facade.explanation$;
    this.isLoading$ = this.facade.isLoading$;
    this.error$ = this.facade.error$;
    this.facade.getExplanation(this.requestBody);
  }

  close() {
    this.dialogService.closeDialog();
  }
}
