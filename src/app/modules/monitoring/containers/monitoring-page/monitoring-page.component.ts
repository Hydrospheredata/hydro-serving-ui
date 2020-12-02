import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  HostListener,
} from '@angular/core';

import {
  CheckCollection,
  AggregationsList,
  CheckId,
  Check,
  Aggregation,
} from '../../models';
import { MonitoringFacade } from '../../store/monitoring.facade';
import { MonitoringPageService } from './monitoring-page.service';

import {
  style,
  transition,
  animate,
  trigger,
  keyframes,
} from '@angular/animations';
import { ModelVersion } from '@app/core/data/types';
import { Observable } from 'rxjs';

@Component({
  selector: 'hs-monitoring-page',
  templateUrl: './monitoring-page.component.html',
  styleUrls: ['./monitoring-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MonitoringFacade, MonitoringPageService],
  animations: [
    trigger('openClosed', [
      transition(':enter', [
        animate(
          '.3s ease-in',
          keyframes([style({ opacity: 0 }), style({ opacity: 0.9 })])
        ),
      ]),
      transition(':leave', [
        animate(
          '.3s ease-in',
          keyframes([style({ opacity: 0 }), style({ opacity: 0.9 })])
        ),
      ]),
    ]),
    trigger('openClosedContainer', [
      transition(':enter', [
        animate(
          '.3s',
          keyframes([
            style({ transform: 'translate(100px)' }),
            style({ transform: 'translate(0px)' }),
          ])
        ),
      ]),
      transition(':leave', [
        animate(
          '1s',
          keyframes([style({ opacity: 0 }), style({ opacity: 0.6 })])
        ),
      ]),
    ]),
  ],
})
export class MonitoringPageComponent implements OnInit {
  aggregationList$: Observable<AggregationsList>;
  modelVersion$: Observable<ModelVersion>;
  checks$: Observable<CheckCollection>;
  selectedAggregation$: Observable<Aggregation>;
  isChecksLoading$: Observable<boolean>;
  checkToShowInDetails$: Observable<Check>;

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeCheckDetails();
    }
  }

  constructor(private monitoringPageService: MonitoringPageService) {}

  ngOnInit(): void {
    this.modelVersion$ = this.monitoringPageService.getModelVersion();
    this.selectedAggregation$ = this.monitoringPageService.getSelectedAggregation();
    this.aggregationList$ = this.monitoringPageService.getAggregationList();
    this.checks$ = this.monitoringPageService.getChecks();
    this.isChecksLoading$ = this.monitoringPageService.isChecksLoading();
    this.checkToShowInDetails$ = this.monitoringPageService.getCheckToShowInDetails();

    this.monitoringPageService.loadMetrics();
    this.monitoringPageService.loadAggregations();
    this.monitoringPageService.loadChecks();
  }

  showCheckDetails(checkId: CheckId): void {
    this.monitoringPageService.showCheckDetails(checkId);
  }

  closeCheckDetails(): void {
    this.monitoringPageService.closeCheckDetails();
  }
}
