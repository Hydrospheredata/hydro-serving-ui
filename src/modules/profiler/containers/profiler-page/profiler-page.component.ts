import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { GetProfilersServiceStatus } from '@profiler/actions';
import { ProfilerStatus } from '@profiler/models';
import { ProfilerState } from '@profiler/reducers';
import { Observable } from 'rxjs';
import { selectProfilerServiceStatus, selectErrorMessage } from '../../selectors';
@Component({
  selector: 'hs-profiler-page',
  templateUrl: './profiler-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilerPageComponent implements OnInit {
  status$: Observable<ProfilerStatus>;
  errorMessage$: Observable<string>;
  @Input() modelVersionId;

  constructor(
    private store: Store<ProfilerState>
  ) {}

  isFailed(): string {
    return ProfilerStatus.FAILED;
  }

  isClosedForOSS(): string {
    return ProfilerStatus.CLOSED_FOR_OSS;
  }

  isLoading(): string {
    return ProfilerStatus.UNKNOWN;
  }

  ngOnInit() {
    this.status$ = this.store.select(selectProfilerServiceStatus);
    this.errorMessage$ = this.store.select(selectErrorMessage);
    this.store.dispatch(new GetProfilersServiceStatus());
  }
}
