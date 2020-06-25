import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComparisonComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
