import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { AggregationsList } from '@monitoring/models';

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

  constructor() {}

  ngOnInit() {
    this.dtrange = [
      this.aggregationsList.minDate,
      this.aggregationsList.maxDate,
    ];
  }

  handleDateTimeFromChange([from, to]: [Date, Date]): void {
    this.dateTimeRangeChanged.next({ from, to });
  }

  get showResetFilter(): boolean {
    return this.filterDateRange !== undefined;
  }

  resetFilter() {
    this.filterDateRangeReset.next();
  }
}
