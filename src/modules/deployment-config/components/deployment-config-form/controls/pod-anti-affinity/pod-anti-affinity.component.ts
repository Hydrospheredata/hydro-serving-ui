import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@node_modules/@angular/forms';

@Component({
  selector: 'hs-pod-anti-affinity',
  templateUrl: './pod-anti-affinity.component.html',
  styleUrls: ['../../../../styles/deployment-config.scss'],
})
export class PodAntiAffinityComponent implements OnInit {
  @Input() group: FormGroup;

  constructor() {}

  ngOnInit() {}

  addRequired() {}

  addPreferred() {}
}
