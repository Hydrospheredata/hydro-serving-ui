import { Component, Input } from '@angular/core';
import { ModelVersion } from '@shared/models';

@Component({
  selector: 'hs-services-header',
  templateUrl: './services-header.component.html',
  styleUrls: ['./services-header.component.scss'],
})
export class ServicesHeaderComponent {
  @Input() modelVersion: ModelVersion;
}
