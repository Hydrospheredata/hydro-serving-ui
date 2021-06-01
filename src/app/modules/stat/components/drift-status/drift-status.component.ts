import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

type DriftStatusIconType = 'icon-error-outline' | 'check' | 'warning';

@Component({
  selector: 'hs-drift-status',
  templateUrl: 'drift-status.component.html',
  styleUrls: ['./drift-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DriftStatusComponent {
  @Input() drift: number;
  @Input() size: number = 16;
  @Input() justIcon: boolean = true;

  get stylesMap() {
    return {
      width: `${this.size}px`,
      height: `${this.size}px`,
    };
  }

  constructor() {}

  get iconType(): DriftStatusIconType {
    if (this.drift === 0 || this.drift <= 0.25) {
      return 'check';
    } else if (this.drift > 0.25 && this.drift <= 0.75) {
      return 'icon-error-outline';
    } else {
      return 'warning';
    }
  }

  get backgroundColor(): string {
    if (this.drift === 0 || this.drift <= 0.25) {
      return '#3ebd93';
    } else if (this.drift > 0.25 && this.drift <= 0.5) {
      return '#f7c948';
    } else if (this.drift > 0.5 && this.drift <= 0.75) {
      return '#cb6e17';
    } else {
      return '#e12d39';
    }
  }

  get statusText(): string {
    if (this.drift === 0 || this.drift <= 0.25) {
      return 'Normal';
    } else if (this.drift > 0.25 && this.drift <= 0.5) {
      return 'Low';
    } else if (this.drift > 0.5 && this.drift <= 0.75) {
      return 'Medium';
    } else {
      return 'Severe';
    }
  }
}
