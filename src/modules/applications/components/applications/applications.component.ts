import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Application } from '@shared/_index';

@Component({
  selector: 'hs-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationsComponent implements OnInit {
  @Input() applications: Application[] = [];
  ngOnInit() {}
}
