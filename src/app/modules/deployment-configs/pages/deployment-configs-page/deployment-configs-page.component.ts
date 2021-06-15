import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, Subject, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import { DeploymentConfig } from '@app/core/data/types';
import { DeploymentConfigsFacade } from '@app/core/facades/deployment-configs.facade';
import { RedirectService } from '@app/core/redirect.service';

@Component({
  selector: 'hs-deployment-configs-page',
  templateUrl: './deployment-configs-page.component.html',
  styleUrls: ['./deployment-configs-page.component.scss'],
})
export class DeploymentConfigsPageComponent implements OnDestroy {
  configs$: Observable<DeploymentConfig[]>;
  selectedConfig$: Observable<DeploymentConfig>;
  error$: Observable<string>;

  private all$: Observable<DeploymentConfig[]>;
  private error: Subject<string> = new Subject<string>();

  private routerSub: Subscription;
  private toggle: boolean;

  constructor(
    private readonly facade: DeploymentConfigsFacade,
    private readonly router: Router,
    private redirectService: RedirectService,
  ) {
    this.error$ = this.error.asObservable();

    this.all$ = this.facade.getAll();
    this.configs$ = this.facade.filtered();

    this.selectedConfig$ = this.facade.selectedConfig();

    this.routerSub = this.redirectService.isRootUrl$
      .pipe(
        filter(isRoot => isRoot),
        tap(_ =>
          this.redirectService.redirectToFirst(this.all$, 'deployment_configs'),
        ),
      )
      .subscribe();

    this.toggle = false;
  }

  addDeploymentConfig(): void {
    this.toggle = true;
    this.router.navigate([`deployment_configs/create`]);
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
    this.toggle = false;
  }

  handleSidebarClick(config: DeploymentConfig): void {
    this.router.navigate([`deployment_configs/${config.name}`]);
  }

  handleFilter(filter: string): void {
    this.facade.onFilter(filter);
  }
}
