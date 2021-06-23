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

  dtrange: any;
  selected: { startDate; endDate };

  constructor() {}

  ngOnInit() {
    this.dtrange = [this.minDate, this.maxDate];
  }

  handleDateTimeFromChange($event): void {
    this.dateTimeRangeChanged.next({
      from: $event.startDate._d,
      to: $event.endDate._d,
    });
  }

  get showResetFilter(): boolean {
    return this.filterDateRange !== undefined;
  }

  resetFilter() {
    this.selected.startDate = this.minDate;
    this.selected.endDate = this.maxDate;
    this.filterDateRangeReset.next();
  }
}
