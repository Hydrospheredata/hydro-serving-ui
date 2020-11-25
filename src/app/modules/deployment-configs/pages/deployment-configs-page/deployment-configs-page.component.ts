import { Component, OnDestroy } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';

import { Observable, Subject, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import { DeploymentConfig } from '@app/core/data/types';

import { DeploymentConfigsFacade } from '@app/core/facades/deployment-configs.facade';

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

  constructor(
    private readonly facade: DeploymentConfigsFacade,
    private readonly router: Router
  ) {
    this.error$ = this.error.asObservable();

    this.all$ = this.facade.getAll();
    this.configs$ = this.facade.filtered();

    this.selectedConfig$ = this.facade.selectedConfig();

    this.routerSub = this.router.events
      .pipe(
        filter(event => this.isRootUrl(event)),
        tap(() => this.redirectToFirst())
      )
      .subscribe();
  }

  addDeploymentConfig(): void {
    // this.dialog.createDialog({
    //   component: AddConfigComponent,
    //   styles: { height: '100%' },
    // });
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
  }

  handleSidebarClick(config: DeploymentConfig): void {
    this.router.navigate([`deployment_configs/${config.name}`]);
  }

  handleFilter(filter: string): void {
    this.facade.onFilter(filter);
  }

  private redirectToFirst() {
    this.all$.subscribe(configs => {
      this.router.navigate([`deployment_configs/${configs[0].name}`]);
    });
  }

  private isRootUrl(event: Event): boolean {
    return event instanceof NavigationEnd && event.url.split('/').length <= 2;
  }
}
