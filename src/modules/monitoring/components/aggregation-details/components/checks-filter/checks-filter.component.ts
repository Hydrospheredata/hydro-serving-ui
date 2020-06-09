import { Component, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import {
  ChecksHealthFilterOptions,
  ChecksFilter,
} from '@monitoring/components/aggregation-details/aggregation-details.service';
import { FormGroup, FormBuilder } from '@node_modules/@angular/forms';
import { Options } from '@node_modules/ng5-slider';
import { debounceTime } from '@node_modules/rxjs/internal/operators';

@Component({
  selector: 'hs-checks-filter',
  templateUrl: './checks-filter.component.html',
  styleUrls: ['./checks-filter.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChecksFilterComponent implements OnInit {
  @Output() filterChanged: EventEmitter<ChecksFilter> = new EventEmitter<
    ChecksFilter
  >();
  form: FormGroup;

  private readonly formsChangeDebounceMs: number = 300;

  sliderOptions: Options = {
    floor: 0,
    ceil: 100,
    step: 1,
    showTicks: true,
    animate: false,
  };

  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.group({
      filterBy: this.fb.control(ChecksHealthFilterOptions.byScore),
      scoreFilter: this.fb.group({
        byMetric: this.fb.control(true),
        byRaw: this.fb.control(true),
        metricScoreRange: this.fb.control([0, 100]),
        rawScoreRange: this.fb.control([0, 100]),
      }),
    });
  }

  ngOnInit() {
    this.form.valueChanges
      .pipe(debounceTime(this.formsChangeDebounceMs))
      .subscribe(value => {
        this.filterChanged.next(value);
      });
  }
}
