import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ViewChild, TemplateRef } from '@node_modules/@angular/core';
import { ServiceStatus } from '@shared/models/service-status.model';

@Component({
  selector: 'hs-service-availability',
  templateUrl: './service-availability.component.html',
  styleUrls: ['./service-availability.component.css'],
})
export class ServiceAvailabilityComponent implements OnChanges {
  @Input() status: ServiceStatus;
  @Input() name: string;
  @Input() error: string;

  activeTemplate: TemplateRef<any>;

  @ViewChild('loadingTemplate', { read: TemplateRef }) loadingTemplate;
  @ViewChild('errorTemplate', { read: TemplateRef }) errorTemplate;
  @ViewChild('alertTemplate', { read: TemplateRef }) alertTemplate;
  @ViewChild('contentTemplate', { read: TemplateRef }) contentTemplate;

  ngOnChanges(changes: SimpleChanges) {
    const status =
      (changes.status && changes.status.currentValue) || this.status;
    switch (status) {
      case ServiceStatus.AVAILABLE:
        this.activeTemplate = this.contentTemplate;
        break;
      case ServiceStatus.CLOSED_FOR_OSS:
        this.activeTemplate = this.alertTemplate;
        break;
      case ServiceStatus.FAILED:
        this.activeTemplate = this.errorTemplate;
        break;
      default:
        this.activeTemplate = this.loadingTemplate;
    }
  }
}
