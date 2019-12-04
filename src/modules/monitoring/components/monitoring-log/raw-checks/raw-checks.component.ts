import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { Check } from '@monitoring/interfaces';
import { ModelVersion } from '@shared/_index';

@Component({
  selector: 'hs-raw-checks',
  templateUrl: './raw-checks.component.html',
  styleUrls: ['./raw-checks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RawChecksComponent implements OnInit {
  @Input() check: Check;
  @Input() modelVersion: ModelVersion;
  @Input() inputKeys: string[] = [];
  @Input() outputKeys: string[] = [];

  isImage(inputName: string): boolean {
    const isImage = this.modelVersion.modelContract.predict.inputs.some(
      p => p.name === inputName && p.profile === 'IMAGE'
    );
    return isImage;
  }

  getValueAsText(data): any {
    try {
      return data.join(', ');
    } catch {
      return data;
    }
  }

  getTensorShape(inputName: string) {
    const inputs = this.modelVersion.modelContract.predict.inputs;
    const input = inputs.find(el => el.name === inputName);

    return input.shape;
  }

  showAsList(name: string) {
    if (name === 'probabilities') {
      return true;
    }
    return false;
  }

  get rawChecks() {
    return this.check._hs_raw_checks;
  }

  get hasRawChecksExceptOverall(): boolean {
    return (
      Object.keys(this.rawChecks)
            .filter(key => key !== 'overall')
            .length > 0
    );
  }

  ngOnInit() {}
}
