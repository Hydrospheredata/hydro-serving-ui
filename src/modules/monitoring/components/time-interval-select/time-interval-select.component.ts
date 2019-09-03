import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'hs-time-interval-select',
  templateUrl: 'time-interval-select.component.html',
  styleUrls: ['time-interval-select.component.scss'],
})
export class TimeIntervalSelectComponent {
  chartTimeWidthParams: Array<{ ms: number; text: string }> = [
    { ms: 900000, text: '15 minutes' },
    { ms: 1800000, text: '30 minutes' },
    { ms: 3600000, text: '1 hour' },
    { ms: 7200000, text: '2 hours' },
    { ms: 14400000, text: '4 hours' },
    { ms: 86400000, text: '1 day' },
    { ms: 604800000, text: '1 week' },
    { ms: 0, text: 'All time' },
  ];

  chartTimeWidth = 0;
  @Output() changed: EventEmitter<number> = new EventEmitter();

  onChangeTimeWidth(timeWidth: number): void {
    this.changed.emit(timeWidth);
  }
}
