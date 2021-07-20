import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { DialogAddApplicationComponent } from '@app/modules/dialogs/components';
import { DialogsService } from '@app/modules/dialogs/dialogs.service';

import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApplicationsFacade } from '@app/core/facades/applications.facade';
import { ModelsFacade } from '@app/core/facades/models.facade';
import { DeploymentConfigsFacade } from '@app/core/facades/deployment-configs.facade';
import { Application, DeploymentConfig } from '@app/core/data/types';
import { RedirectService } from '@app/core/redirect.service';

@Component({
  selector: 'hs-applications-page',
  templateUrl: './applications-page.component.html',
  styleUrls: ['./applications-page.component.scss'],
})
export class ApplicationsPageComponent {
  allApplications$: Observable<Application[]>;
  applications$: Observable<Application[]>;
  selectedApplication$: Observable<Application>;

  constructor(
    private facade: ApplicationsFacade,
    private modelsFacade: ModelsFacade,
    private depConfigsFacade: DeploymentConfigsFacade,
    private dialog: DialogsService,
    private router: Router,
    private redirectService: RedirectService,
  ) {
    this.allApplications$ = facade.allApplications();
    this.selectedApplication$ = facade.selectedApplication();
    this.applications$ = facade.visibleApplications();

    this.redirectService.redirectToFirst(this.allApplications$, 'applications');
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
    this.facade.toggleFavorite(application);
  }

  handleSidebarClick({ name }: Application): void {
    this.router.navigate([`applications/${name}`]);
  }
}
