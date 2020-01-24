import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { IApplication, ApplicationStatus } from '@shared/models/_index';

@Component({
  selector: 'hs-application-status',
  templateUrl: './application-status.component.html',
  styleUrls: ['./application-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationStatusComponent {
  @Input() status: ApplicationStatus = ApplicationStatus.Undefined;
}
