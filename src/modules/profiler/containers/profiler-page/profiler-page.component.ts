import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ProfilerStatus } from '@profiler/models';
import {
  ProfilerFacade,
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
  error$ = this.facade.error$;

  @ViewChild('loadingTemplate', { read: TemplateRef }) loadingTemplate;
  @ViewChild('errorTemplate', { read: TemplateRef }) errorTemplate;
  @ViewChild('alertTemplate', { read: TemplateRef }) alertTemplate;
  @ViewChild('contentTemplate', { read: TemplateRef }) contentTemplate;

  constructor(
    private facade: ProfilerFacade
  ) {}

  ngOnInit() {
    this.facade.getProfilerServiceStatus();

    this.activeTemplate$ = this.facade.serviceStatus$.pipe(
      map(status => this.statusToTemplate(status))
    );
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
