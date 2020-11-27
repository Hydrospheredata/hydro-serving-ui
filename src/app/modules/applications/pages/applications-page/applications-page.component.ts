import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { DialogAddApplicationComponent } from '@app/modules/dialogs/components';
import { Observable, Subscription } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';

import { ApplicationsFacade } from '@app/core/facades/applications.facade';
import { ModelsFacade } from '@app/core/facades/models.facade';

import { DialogsService } from '@app/modules/dialogs/dialogs.service';
import { Application } from '@app/core/data/types';

@Component({
  selector: 'hs-applications-page',
  templateUrl: './applications-page.component.html',
  styleUrls: ['./applications-page.component.scss'],
})
export class ApplicationsPageComponent implements OnDestroy {
  applications$: Observable<Application[]>;
  someModelVersionIsReleased$: Observable<boolean>;
  selectedApplication$: Observable<Application>;

  private routerSub: Subscription;
  constructor(
    private facade: ApplicationsFacade,
    private modelsFacade: ModelsFacade,
    private dialog: DialogsService,
    private router: Router
  ) {
    this.selectedApplication$ = this.facade.selectedApplication();

    this.routerSub = this.router.events
      .pipe(
        filter(event => this.isRootApplicationsUrl(event)),
        tap(_ => this.redirectToFirst())
      )
      .subscribe();

    this.applications$ = facade.allApplications();
    this.someModelVersionIsReleased$ = this.modelsFacade.someModelVersionIsReleased();
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

  private isRootApplicationsUrl(event: Event): boolean {
    return event instanceof NavigationEnd && event.url.split('/').length <= 2;
  }
}
