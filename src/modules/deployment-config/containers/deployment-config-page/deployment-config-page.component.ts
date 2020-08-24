import { Component, OnInit, OnDestroy } from '@angular/core';
import { DialogService } from '@dialog/dialog.service';
import { Router, Event, NavigationEnd } from '@node_modules/@angular/router';
import { Observable, Subject, Subscription } from '@node_modules/rxjs';
import { filter, tap } from '@node_modules/rxjs/operators';
import { AddConfigComponent } from '../../components/dialogs';
import { DeploymentConfigsFacade } from '../../facades';
import { DeploymentConfig } from '../../models';

@Component({
  selector: 'hs-deployment-config-page',
  templateUrl: './deployment-config-page.component.html',
  styleUrls: ['./deployment-config-page.component.scss'],
})
export class DeploymentConfigPageComponent implements OnInit, OnDestroy {
  configs$: Observable<DeploymentConfig[]>;
  selectedConfig$: Observable<DeploymentConfig>;
  error$: Observable<string>;

  private all$: Observable<DeploymentConfig[]>;
  private error: Subject<string> = new Subject<string>();
  private routerSub: Subscription;

  constructor(
    private readonly facade: DeploymentConfigsFacade,
    private readonly router: Router,
    private readonly dialog: DialogService
  ) {
    this.error$ = this.error.asObservable();

    this.all$ = this.facade.all();
    this.configs$ = this.facade.filtered();

    this.selectedConfig$ = this.facade.selectedConfig();

    this.routerSub = this.router.events
      .pipe(
        filter(event => DeploymentConfigPageComponent.isRootUrl(event)),
        tap(() => this.redirectToFirst())
      )
      .subscribe();
  }

  addDeploymentConfig(): void {
    this.dialog.createDialog({
      component: AddConfigComponent,
      styles: { height: '100%' },
    });
  }

  ngOnInit() {}

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
    debugger;
    this.all$.subscribe(configs => {
      debugger;
      this.router.navigate([`deployment_configs/${configs[0].name}`]);
    });
  }

  private static isRootUrl(event: Event): boolean {
    return event instanceof NavigationEnd && event.url.split('/').length <= 2;
  }
}
