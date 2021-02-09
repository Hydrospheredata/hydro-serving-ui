import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DeploymentConfigsFacade } from '@app/core/facades/deployment-configs.facade';
import { DeploymentConfig } from '@app/core/data/types';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'hs-deployment-config-details',
  templateUrl: './deployment-config-details.component.html',
  styleUrls: ['./deployment-config-details.component.scss'],
})
export class DeploymentConfigDetailsComponent implements OnInit {
  config$: Observable<DeploymentConfig>;
  editMode: boolean;
  constructor(private readonly facade: DeploymentConfigsFacade) {}

  ngOnInit() {
    this.config$ = this.facade.selectedConfig().pipe(tap(() => {
      this.editMode = false;
    }));
  }

  onDelete(name: string) {
    this.facade.delete(name);
  }

  onEdit(name: string) {
    this.editMode = true;
  }

  onCancel() {
    this.editMode = false;
  }
}
