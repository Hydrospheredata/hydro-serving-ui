import { Component, OnInit, Input } from '@angular/core';
import { Servable } from '@app/core/data/types';

@Component({
  selector: 'hs-servable-status-icon',
  templateUrl: './servable-status-icon.component.html',
  styleUrls: ['./servable-status-icon.component.scss'],
})
export class ServableStatusIconComponent implements OnInit {
  @Input()
  servable: Servable;

  constructor() {}

  get status(): string {
    return this.servable.status;
  }

  get message(): string {
    let res = `Servable: ${this.servable.name}\n`;

    if (this.servable.message) {
      res += `\n Message: ${this.servable.message}`;
    }

    return res;
  }

  ngOnInit(): void {}
}
