import { Component, OnInit, Input } from '@angular/core';
import { Observable, combineLatest } from '@node_modules/rxjs';
import { DeploymentConfigsFacade } from '../../facades';
import { DeploymentConfig } from '../../models';

@Component({
  selector: 'hs-deployment-config',
  templateUrl: './deployment-config.component.html',
  styleUrls: ['./deployment-config.component.scss'],
})
export class DeploymentConfigComponent implements OnInit {
  config$: Observable<DeploymentConfig>;

  constructor(private readonly facade: DeploymentConfigsFacade) {}

  ngOnInit() {
    this.config$ = this.facade.selectedConfig();
  }

  onDelete(name: string) {
    this.facade.delete(name);
  }
}
