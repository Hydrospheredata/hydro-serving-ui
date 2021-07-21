import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { AggregationsList } from '../../../models';

@Component({
  selector: 'hs-aggregation-sidebar',
  templateUrl: './aggregation-sidebar.component.html',
  styleUrls: ['./aggregation-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AggregationSidebarComponent implements OnInit {
  @Input() minDate: Date;
  @Input() maxDate: Date;
  @Input() filterDateRange: { from: Date; to: Date };
  @Input() aggregationsList: AggregationsList;

  @Output() dateTimeRangeChanged: EventEmitter<{
    from: Date;
    to: Date;
  }> = new EventEmitter<{ from: Date; to: Date }>();
  @Output() filterDateRangeReset: EventEmitter<{
    from: Date;
    to: Date;
  }> = new EventEmitter<{ from: Date; to: Date }>();

  selected: { startDate; endDate };
  dateRangeFired = false;

  constructor() {}

  ngOnInit() {
    this.selected = { startDate: this.minDate, endDate: this.minDate };
  }

  handleDateTimeFromChange($event): void {
    if ($event.endDate && $event.startDate) {
      this.dateTimeRangeChanged.next({
        from: $event.startDate._d,
        to: $event.endDate._d,
      });
    }
  }

  get showResetFilter(): boolean {
    return this.filterDateRange !== undefined;
  }

  resetFilter() {
    this.selected = { startDate: this.minDate, endDate: this.minDate };
    this.filterDateRangeReset.next();
  }
}
