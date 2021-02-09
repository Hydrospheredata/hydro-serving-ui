import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DeploymentConfigsFacade } from '@app/core/facades/deployment-configs.facade';
import { DeploymentConfig } from '@app/core/data/types';
import { Router } from '@angular/router';
import {cloneDeep} from 'lodash';

@Component({
  selector: 'hs-dc-edit',
  templateUrl: './dc-edit.component.html',
  styleUrls: ['./dc-edit.component.scss']
})
export class DcEditComponent implements OnInit {
  config: DeploymentConfig;
  configSubscription: Subscription;
  name: string;
  hpaKeys: string[];
  envKeys: string[];

  constructor(private readonly facade: DeploymentConfigsFacade, private router: Router) { }

  onSave() {
    this.configSubscription.unsubscribe();
    this.facade.update(this.name, this.config);
    this.router.navigate([`deployment_configs/${this.config.name}`]);
  }

  ngOnInit(): void {
    this.configSubscription = this.facade.selectedConfig().subscribe(conf => {
      this.config =  cloneDeep(conf);
      this.name = conf.name;
      this.hpaKeys = Object.keys(conf.hpa);
      if(conf.container.env) this.envKeys = Object.keys(conf.container.env);
    });
  }

  ngOnDestroy() {
    this.configSubscription.unsubscribe();
  }

}
