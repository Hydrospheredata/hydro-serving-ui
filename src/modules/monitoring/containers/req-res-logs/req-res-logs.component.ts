import { Component, Input, OnInit } from '@angular/core';
import { RequestResponseLogService } from '@core/services';
import { DialogService } from '@dialog/dialog.service';
import { ModelVersion, TimeInterval } from '@shared/_index';
import { MetricSpecification } from '@shared/models/metric-specification.model';
import { combineLatest, Observable, BehaviorSubject, throwError } from 'rxjs';
import { filter, exhaustMap, catchError, tap } from 'rxjs/operators';
import { ExplanationComponent } from '../../../root-cause/containers';

@Component({
  selector: 'hs-req-res-logs',
  templateUrl: './req-res-logs.component.html',
  styleUrls: ['req-res-logs.component.scss'],
})
export class ReqResLogsComponent implements OnInit {
  log$: any;
  maxMessages: number = 20;
  maxMBytes: number = 5;
  reverse: boolean = true;
  loadFailed: boolean = true;

  updateLogButtonClick$: BehaviorSubject<any> = new BehaviorSubject('');
  @Input() modelVersion$: Observable<ModelVersion>;
  @Input() timeInterval$: Observable<TimeInterval>;
  @Input() metricSpecs$: Observable<MetricSpecification[]>;

  constructor(
    private reqResLogService: RequestResponseLogService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.log$ = combineLatest(
      this.timeInterval$,
      this.modelVersion$,
      this.metricSpecs$,
      this.updateLogButtonClick$
    ).pipe(
      filter(([mv, metricSpecifications]) => !!metricSpecifications && !!mv),
      exhaustMap(([timeInterval, modelVersion, metricSpecifications]) => {
        return this.reqResLogService
          .getLog({
            timeInterval,
            modelVersion,
            metricSpecifications,
            maxMBytes: this.maxMBytes,
            maxMessages: this.maxMessages,
            reverse: this.reverse,
            health: this.loadFailed ? 0 : undefined,
          })
          .pipe(
            catchError(err => {
              console.error('err');
              return throwError(err);
            })
          );
      })
    );
  }

  updateReqstore(): void {
    this.updateLogButtonClick$.next('click');
  }

  getExplanation(): void {
    this.dialogService.createDialog({
      component: ExplanationComponent,
    });
  }
}
