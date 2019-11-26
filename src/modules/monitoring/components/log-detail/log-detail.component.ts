import { Component, Input, OnInit } from '@angular/core';
import { Check } from '@monitoring/interfaces';
import { ModelVersion } from '@shared/_index';

@Component({
  selector: 'hs-log-detail',
  templateUrl: 'log-detail.component.html',
  styleUrls: ['log-detail.component.scss'],
})
export class LogDetailComponent implements OnInit {
  @Input() check: Check;
  // Remove from here to selectors
  @Input() modelVersion: ModelVersion;

  inputKeys: string[];
  outputKeys: string[];

  ngOnInit(): void {
    const { inputs, outputs } = this.modelVersion.modelContract.predict;
    this.inputKeys = inputs.map(el => el.name);
    this.outputKeys = outputs.map(el => el.name);
  }

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
}
