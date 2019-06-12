import { MdlSnackbarService } from '@angular-mdl/core';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { HydroServingState } from '@core/reducers';
import { TimemachineService } from '@core/services/timemachine.service';
import { getSiblingVersions, getSelectedModelVersion } from '@models/reducers';
import { Store } from '@ngrx/store';
import { IModelVersion, ModelVersion } from '@shared/_index';
import { Observable, fromEvent, Subscription } from 'rxjs';
import { withLatestFrom, tap, exhaustMap } from 'rxjs/operators';

@Component({
  selector: 'hs-model-version-reply',
  templateUrl: './model-version-reply.component.html',
  styleUrls: ['./model-version-reply.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModelVersionReplyComponent implements OnInit, OnDestroy {
  @ViewChild('replyButton', { read: ElementRef }) replyButton: ElementRef;
  siblingsModelVersions$: Observable<IModelVersion[]>;
  replayableModelVersion: number;
  onReplyClick$: Observable<any>;
  replyClickSubscribe: Subscription;

  constructor(
    private store: Store<HydroServingState>,
    private timemachine: TimemachineService,
    private snackbar: MdlSnackbarService
  ) {
    this.siblingsModelVersions$ = this.store.select(getSiblingVersions);
  }

  ngOnInit() {
    this.onReplyClick$ = fromEvent(
      this.replyButton.nativeElement,
      'click'
    ).pipe(
      withLatestFrom(this.store.select(getSelectedModelVersion)),
      tap(console.dir),
      exhaustMap(([_, modelVersionTo]: [any, ModelVersion]) => {
        return this.timemachine.travel({
          modelNameTo: `${modelVersionTo.model.name}`,
          modelVersionFrom: `${this.replayableModelVersion}`,
          versionTo: `${modelVersionTo.id}`,
          from: '0',
          till: '8559030671000000000',
        });
      })
    );
    this.replyClickSubscribe = this.onReplyClick$.subscribe();
  }

  ngOnDestroy(): void {
    this.replyClickSubscribe.unsubscribe();
  }
}
