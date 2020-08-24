import { Component, OnInit, Input } from '@angular/core';
import { DeploymentConfig } from '../../../../models';

@Component({
  selector: 'hs-dc-tree',
  templateUrl: './dc-tree.component.html',
  styleUrls: ['./dc-tree.component.scss'],
})
export class DcTreeComponent implements OnInit {
  @Input() config: DeploymentConfig;
  constructor() {}

  ngOnInit() {}
}
