import { Observable, of } from 'rxjs';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { BatchDetailsService } from './batch-details.service';
import { CheckCollection, Check, CheckId } from '../../models';
import { ModelVersion } from '@app/core/data/types';

@Component({
  selector: 'hs-batch-details',
  templateUrl: './batch-details.component.html',
  styleUrls: ['./batch-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [BatchDetailsService],
})
export class BatchDetailsComponent implements OnInit {
  @Output() showCheckDetails: EventEmitter<CheckId> = new EventEmitter<
    CheckId
  >();

  checks$: Observable<Check[]> = of([]);
  checkCollection$: Observable<CheckCollection>;
  modelVersion$: Observable<ModelVersion>;

  constructor(private facade: BatchDetailsService) {}

  ngOnInit() {
    this.checks$ = this.facade.getVisibleChecks();
    this.checkCollection$ = this.facade.getCheckCollection();
    this.modelVersion$ = this.facade.getModelVersion();
  }

  onFilterChange(s) {
    this.facade.setFilter(s);
  }

  showDetails(check: Check) {
    this.showCheckDetails.next(check.id);
  }
}
