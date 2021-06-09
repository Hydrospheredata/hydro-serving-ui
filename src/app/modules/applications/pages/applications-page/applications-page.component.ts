import { Component, OnDestroy } from '@angular/core';
import { Event, NavigationEnd, Router, RouterEvent } from '@angular/router';

import { DialogAddApplicationComponent } from '@app/modules/dialogs/components';
import { DialogsService } from '@app/modules/dialogs/dialogs.service';

import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, first, tap, map } from 'rxjs/operators';

import { ApplicationsFacade } from '@app/core/facades/applications.facade';
import { ModelsFacade } from '@app/core/facades/models.facade';
import { DeploymentConfigsFacade } from '@app/core/facades/deployment-configs.facade';
import { Application, DeploymentConfig } from '@app/core/data/types';
import { IsRootUrlService } from '@app/core/is-root-url.service';

@Component({
  selector: 'hs-applications-page',
  templateUrl: './applications-page.component.html',
  styleUrls: ['./applications-page.component.scss'],
})
export class ApplicationsPageComponent implements OnDestroy {
  applications$: Observable<Application[]>;
  selectedApplication$: Observable<Application>;
  isRootUrl$: Observable<boolean>;

  private routerEvents$: Observable<Event>;
  private routerSub: Subscription;

  constructor(
    private facade: ApplicationsFacade,
    private modelsFacade: ModelsFacade,
    private depConfigsFacade: DeploymentConfigsFacade,
    private dialog: DialogsService,
    private router: Router,
    private rootUrlService: IsRootUrlService,
  ) {
    this.selectedApplication$ = this.facade.selectedApplication();

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

    this.applications$ = facade.allApplications();
  }

  isButtonEnabled() {
    return combineLatest([
      this.someModelVersionIsReleased(),
      this.getDepConfigs(),
    ]).pipe(
      map(([someReleased, depConfigs]) => {
        return someReleased && depConfigs.length > 0;
      }),
    );
  }

  someModelVersionIsReleased(): Observable<Boolean> {
    return this.modelsFacade.someModelVersionIsReleased();
  }

  getDepConfigs(): Observable<DeploymentConfig[]> {
    return this.depConfigsFacade.getAll();
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
  }

  addApplication(): void {
    this.dialog.createDialog({
      component: DialogAddApplicationComponent,
      styles: { height: '100%' },
    });
  }

  handleFilter(filterStr: string): void {
    // this.facade.onFilter(filterStr);
  }

  handleBookmark(application: Application): void {
    this.facade.toggleFavorite(application);
  }

  handleSidebarClick({ name }: Application): void {
    this.router.navigate([`applications/${name}`]);
  }

  private redirectToFirst() {
    this.applications$.pipe(first(apps => apps.length > 0)).subscribe(apps => {
      this.router.navigate([`applications/${apps[0].name}`]);
    });
  }
}
