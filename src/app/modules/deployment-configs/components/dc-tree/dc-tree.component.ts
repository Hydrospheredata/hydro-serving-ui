import { Component, OnInit, Input } from '@angular/core';
import { DeploymentConfig } from '@app/core/data/types';

@Component({
  selector: 'hs-dc-tree',
  templateUrl: './dc-tree.component.html',
  styleUrls: ['./dc-tree.component.scss'],
})
export class DcTreeComponent {
  @Input() config: DeploymentConfig;
  constructor() {}
}
