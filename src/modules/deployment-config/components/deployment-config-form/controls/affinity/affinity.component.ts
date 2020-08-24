import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@node_modules/@angular/forms';

@Component({
  selector: 'hs-affinity',
  templateUrl: './affinity.component.html',
  styleUrls: ['../../../../styles/deployment-config.scss'],
})
export class AffinityComponent implements OnInit {
  @Input() group: FormGroup;

  constructor() {}

  ngOnInit() {}
}
