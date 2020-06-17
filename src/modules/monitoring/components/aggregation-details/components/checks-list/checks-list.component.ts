import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Check } from '@monitoring/models';
import { trigger, transition, query, style, stagger, animate } from '@node_modules/@angular/animations';

@Component({
  selector: 'hs-checks-list',
  templateUrl: './checks-list.component.html',
  styleUrls: ['./checks-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('filterAnimation', [
      transition(':enter, * => 0, * => -1', []),
      transition(':increment', [
        query(
          ':enter',
          [
            style({ opacity: 0, width: '0px' }),
            stagger(50, [
              animate('300ms ease-out', style({ opacity: 1, width: '*' })),
            ]),
          ],
          { optional: true }
        ),
      ]),
      transition(':decrement', [
        query(':leave', [
          stagger(50, [
            animate('300ms ease-out', style({ opacity: 0, width: '0px' })),
          ]),
        ]),
      ]),
    ]),
  ],
})
export class ChecksListComponent implements OnInit {
  @Input() checks: Check[];
  @Output() checkClicked: EventEmitter<Check> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onClick(check: Check): void {
    this.checkClicked.next(check);
  }

  get total() {
    return this.checks.length;
  }
}
