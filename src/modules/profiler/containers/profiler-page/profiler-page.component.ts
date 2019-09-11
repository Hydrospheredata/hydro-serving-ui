import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { ProfilerStatus } from '@profiler/models';
import {
  ProfilerState,
  GetProfilerServiceStatus,
  selectProfilerServiceStatus,
  selectErrorMessage,
} from '@profiler/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'hs-profiler-page',
  templateUrl: './profiler-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilerPageComponent implements OnInit {
  activeTemplate$: Observable<TemplateRef<any>>;
  error$: Observable<string>;

  @ViewChild('loadingTemplate', { read: TemplateRef }) loadingTemplate;
  @ViewChild('errorTemplate', { read: TemplateRef }) errorTemplate;
  @ViewChild('alertTemplate', { read: TemplateRef }) alertTemplate;
  @ViewChild('contentTemplate', { read: TemplateRef }) contentTemplate;

  constructor(private store: Store<ProfilerState>) {}

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
    this.error$ = this.store.select(selectErrorMessage);
    this.store.dispatch(GetProfilerServiceStatus());

    this.activeTemplate$ = this.store
      .select(selectProfilerServiceStatus)
      .pipe(map(status => this.statusToTemplate(status)));
  }

  private statusToTemplate(status: ProfilerStatus): TemplateRef<any> {
    switch (status) {
      case ProfilerStatus.AVAILABLE:
        return this.contentTemplate;
      case ProfilerStatus.CLOSED_FOR_OSS:
        return this.alertTemplate;
      case ProfilerStatus.FAILED:
        return this.errorTemplate;
      default:
        return this.loadingTemplate;
    }
  }
}
