import { Component, OnDestroy } from '@angular/core';
import { Router, Event, NavigationEnd, RouterEvent } from '@angular/router';

import { Observable, Subject, Subscription } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { first } from 'rxjs/operators';

import { DeploymentConfig } from '@app/core/data/types';
import { DeploymentConfigsFacade } from '@app/core/facades/deployment-configs.facade';
import { IsRootUrlService } from '@app/core/is-root-url.service';

@Component({
  selector: 'hs-deployment-configs-page',
  templateUrl: './deployment-configs-page.component.html',
  styleUrls: ['./deployment-configs-page.component.scss'],
})
export class DeploymentConfigsPageComponent implements OnDestroy {
  configs$: Observable<DeploymentConfig[]>;
  selectedConfig$: Observable<DeploymentConfig>;
  error$: Observable<string>;
  isRootUrl$: Observable<boolean>;

  private all$: Observable<DeploymentConfig[]>;
  private error: Subject<string> = new Subject<string>();

  private routerEvents$: Observable<Event>;
  private routerSub: Subscription;
  private toggle: boolean;

  constructor(
    private readonly facade: DeploymentConfigsFacade,
    private readonly router: Router,
    private rootUrlService: IsRootUrlService,
  ) {
    this.error$ = this.error.asObservable();

    this.all$ = this.facade.getAll();
    this.configs$ = this.facade.filtered();

    this.selectedConfig$ = this.facade.selectedConfig();

    this.routerEvents$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    );
    this.isRootUrl$ = this.routerEvents$.pipe(
      map((event: RouterEvent) => this.rootUrlService.isRootUrl(event)),
    );

    this.routerSub = this.isRootUrl$
      .pipe(
        filter(isRoot => isRoot),
        tap(_ => this.redirectToFirst()),
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

  private redirectToFirst() {
    this.all$.pipe(first(configs => configs.length > 0)).subscribe(configs => {
      this.router.navigate([`deployment_configs/${configs[0].name}`]);
    });
  }
}
