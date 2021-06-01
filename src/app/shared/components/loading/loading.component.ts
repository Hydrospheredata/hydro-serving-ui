import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'hs-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {
  @Input() loading: boolean;
  constructor() {}
}
