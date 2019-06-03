import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { HydroServingState } from '@core/reducers';
import { TimemachineService } from '@core/services/timemachine.service';
import { getSiblingVersions } from '@models/reducers';
import { Store } from '@ngrx/store';
import { IModelVersion } from '@shared/_index';
import { Observable, BehaviorSubject, Subject, fromEvent } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'hs-timemachine',
  templateUrl: './timemachine.component.html',
  styleUrls: ['./timemachine.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimemachineComponent implements OnInit {
  siblingModelVersions$: Observable<IModelVersion[]>;
  loadDataFromModelersionWithId$: Subject<number> = new Subject();

  @ViewChild('loadDataButton', { read: ElementRef}) loadDataButton: ElementRef<HTMLElement>;

  private modelVer;
  private onClickLoadButton$;

  get mv() {
    return this.modelVer;
  }
  set mv(id) {
    this.loadDataFromModelersionWithId$.next(id);
    this.modelVer = id;
  }

  constructor(
    private store: Store<HydroServingState>,
    private timemachineService: TimemachineService
  ) {}

  ngOnInit(
  ) {
    this.siblingModelVersions$ = this.store.select(getSiblingVersions);
    this.onClickLoadButton$ = fromEvent(this.loadDataButton.nativeElement, 'click').pipe(
        switchMap(() => this.adventureTime()),
        tap(() => {  })
      );

    this.onClickLoadButton$.subscribe();
  }

  adventureTime(): Observable<any> {
    return this.timemachineService.travel({
      modelVersionFrom: '1',
      modelNameTo: 'claims',
      versionTo: '2',
      from: '0',
      till: '1569045724',
    });
  }
}
