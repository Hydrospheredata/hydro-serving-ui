import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ApplicationStatus } from '@app/core/data/types';

@Component({
  selector: 'hs-application-status',
  template: '<hs-icon [ngClass]="classMap" [type]="type"></hs-icon>',
  styleUrls: ['./application-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationStatusComponent {
  @Input() status: ApplicationStatus = ApplicationStatus.Undefined;

  get type(): string {
    switch (this.status) {
      case ApplicationStatus.Ready:
        return 'circle-check';
      case ApplicationStatus.Failed:
        return 'circle-x';
      case ApplicationStatus.Assembling:
        return 'clock';
    }
  }

  get classMap() {
    const rootClass = 'app-status';
    return {
      [rootClass]: true,
      [`${rootClass}--released`]: this.status === ApplicationStatus.Ready,
      [`${rootClass}--assembling`]:
        this.status === ApplicationStatus.Assembling,
      [`${rootClass}--failed`]: this.status === ApplicationStatus.Failed,
    };
  }
}
