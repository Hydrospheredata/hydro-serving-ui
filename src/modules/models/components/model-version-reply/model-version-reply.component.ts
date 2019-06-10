import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { HydroServingState } from '@core/reducers';
import { TimemachineService } from '@core/services/timemachine.service';
import { getSiblingVersions, getSelectedModelVersion } from '@models/reducers';
import { Store } from '@ngrx/store';
import { IModelVersion } from '@shared/_index';
import { Observable, fromEvent } from 'rxjs';
import { withLatestFrom, tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'hs-model-version-reply',
  templateUrl: './model-version-reply.component.html',
  styleUrls: ['./model-version-reply.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModelVersionReplyComponent implements OnInit {
  @ViewChild('replyButton', { read: ElementRef }) replyButton: ElementRef;
  siblingsModelVersions$: Observable<IModelVersion[]>;
  replayableModelVersion: number;
  onReplyClick$: Observable<any>;

  constructor(
    private store: Store<HydroServingState>,
    private timemachine: TimemachineService
  ) {
    this.siblingsModelVersions$ = this.store.select(getSiblingVersions);
  }

  ngOnInit() {
    this.onReplyClick$ = fromEvent(this.replyButton.nativeElement, 'click').pipe(
      withLatestFrom(this.store.select(getSelectedModelVersion)),
      tap(console.dir)
    );
    this.onReplyClick$.subscribe();
  }
}
