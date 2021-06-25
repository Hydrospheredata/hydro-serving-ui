import { Options } from '@angular-slider/ngx-slider';
import { debounceTime } from 'rxjs/operators';

import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import {
  ChecksHealthFilterOptions,
  ChecksFilter,
} from '../../batch-details.service';

@Component({
  selector: 'hs-requests-filter',
  templateUrl: './requests-filter.component.html',
  styleUrls: ['./requests-filter.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RequestsFilterComponent implements OnInit {
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
      filterBy: this.fb.control(ChecksHealthFilterOptions.all),
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
