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
}