import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Line } from '../../../hs-d3/model';

@Component({
  selector: 'hs-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  line: Line = {x1: 0, y1: 0, x2: 30, y2: 30, color: 'red'};
  ngOnInit() {
  }
}
