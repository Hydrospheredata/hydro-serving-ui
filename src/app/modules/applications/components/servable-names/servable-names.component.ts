import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'hs-servable-names',
  templateUrl: './servable-names.component.html',
  styleUrls: ['./servable-names.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServableNamesComponent implements OnInit {

  @Input() servableNames: string[] = [];

  constructor() { }

  ngOnInit() {}

}
