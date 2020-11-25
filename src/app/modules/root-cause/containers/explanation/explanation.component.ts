import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
  OnInit,
} from '@angular/core';
import { DialogsService } from '@app/modules/dialogs/dialogs.service';
import { shareReplay, switchMap } from '@node_modules/rxjs/internal/operators';
import { EXPLANATION, ExplanationDialogComponent } from '../../containers';
import { ExplanationFacade } from '../../containers/explanation/explanation.facade';
import { Explanation, ExplanationStatus } from '../../models';
import { RootCauseState } from '../../store/state';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'hs-explanation',
  templateUrl: './explanation.component.html',
  styleUrls: ['./explanation.component.scss'],
  viewProviders: [RootCauseState, ExplanationFacade],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExplanationComponent implements OnInit, OnChanges {
  @Input() requestId: string;
  @Input() modelVersionId: number;

  explanation$: Observable<Explanation>;
  tooltip$: Observable<string>;

  constructor(
    private readonly facade: ExplanationFacade,
    private readonly dialogService: DialogsService
  ) {}

  ngOnInit() {
    this.explanation$ = this.facade.getExplanation().pipe(shareReplay(1));
    this.tooltip$ = this.explanation$.pipe(
      switchMap(expl => {
        if (expl === undefined) {
          return of(undefined);
        }

        switch (expl.state) {
          case ExplanationStatus.notSupported:
          case ExplanationStatus.failed:
            return of(expl.description);
          default:
            return of(undefined);
        }
      })
    );

    this.facade.loadExplanation(this.requestId, this.modelVersionId);
  }

  createExplanation(): void {
    this.facade.createExplanation(this.modelVersionId, this.requestId);
  }

  showExplanation(result) {
    this.dialogService.createDialog({
      component: ExplanationDialogComponent,
      providers: [{ provide: EXPLANATION, useValue: result }],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.requestId &&
      changes.requestId.currentValue &&
      !changes.requestId.firstChange
    ) {
      this.facade.loadExplanation(this.requestId, this.modelVersionId);
    }
  }
}
