import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Check } from '../../../monitoring/models';
import { ModelVersion } from '@app/core/data/types';

@Component({
  selector: 'hs-raw-checks',
  templateUrl: './raw-checks.component.html',
  styleUrls: ['./raw-checks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RawChecksComponent {
  @Input() check: Check;
  @Input() modelVersion: ModelVersion;
  @Input() inputKeys: string[] = [];
  @Input() outputKeys: string[] = [];

  isImage(inputName: string): boolean {
    return this.modelVersion.contractInputs.some(
      p => p.name === inputName && p.profile === 'IMAGE'
    );
  }

  getValueAsText(data): any {
    try {
      return data.join(', ');
    } catch {
      return data;
    }
  }

  getTensorShape(inputName: string) {
    const inputs = this.modelVersion.contractInputs;
    const input = inputs.find(el => el.name === inputName);

    return input.shape;
  }

  showAsList(name: string) {
    return name === 'probabilities';
  }

  get rawChecks() {
    return this.check.rawChecks;
  }

  get hasRawChecksExceptOverall(): boolean {
    return (
      Object.keys(this.rawChecks).filter(key => key !== 'overall').length > 0
    );
  }
}
