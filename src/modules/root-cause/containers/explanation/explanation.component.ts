import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
  OnInit,
} from '@angular/core';
import { DialogService } from '@dialog/dialog.service';
import { EXPLANATION, ExplanationDialogComponent } from '@rootcause/containers';
import { ExplanationFacade } from '@rootcause/containers/explanation/explanation.facade';
import { Explanation } from '@rootcause/models';
import { RootCauseState } from '@rootcause/store/state';
import { Observable } from 'rxjs';

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

  constructor(
    private readonly facade: ExplanationFacade,
    private readonly dialogService: DialogService
  ) {}

  ngOnInit() {
    this.explanation$ = this.facade.getExplanation();

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
