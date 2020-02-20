import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { DialogAddApplicationComponent } from '@applications/components';
import { ApplicationsFacade } from '@applications/store';
import { DialogService } from '@dialog/dialog.service';
import { ModelsFacade } from '@models/store';
import { Application } from '@shared/_index';
import { Observable, Subscription } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';

@Component({
  selector: 'hs-applications-page',
  templateUrl: './applications-page.component.html',
  styleUrls: ['./applications-page.component.scss'],
})
export class ApplicationsPageComponent implements OnDestroy {
  applications$: Observable<Application[]>;
  someModelVersionIsReleased$: Observable<boolean>;
  selectedApplication$: Observable<Application> = this.facade
    .selectedApplication$;

  private routerSub: Subscription;
  constructor(
    private facade: ApplicationsFacade,
    private modelsFacade: ModelsFacade,
    private dialog: DialogService,
    private router: Router
  ) {
    this.routerSub = this.router.events
      .pipe(
        filter(event => this.isRootApplicationsUrl(event)),
        tap(_ => this.redirectToFirst())
      )
      .subscribe();

    this.applications$ = facade.visibleApplications$;
    this.someModelVersionIsReleased$ = this.modelsFacade.someModelVersionIsReleased$;
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
    this.facade.onFilter(filterStr);
  }

  handleBookmark(application: Application): void {
    console.log('handle toggle', { application });
    this.facade.toggleFavorite(application);
  }

  handleSidebarClick(application: Application): void {
    this.router.navigate([`applications/${application.name}`]);
  }

  private redirectToFirst() {
    this.applications$
      .pipe(
        filter(application => application.length > 0),
        take(1)
      )
      .subscribe(applications => {
        this.router.navigate([`applications/${applications[0].name}`]);
      });
  }

  private isRootApplicationsUrl(event: Event): boolean {
    return event instanceof NavigationEnd && event.url.split('/').length <= 2;
  }
}
