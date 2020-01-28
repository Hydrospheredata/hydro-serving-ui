import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogAddApplicationComponent } from '@applications/components';
import { ApplicationsFacade } from '@applications/store';
import { DialogService } from '@dialog/dialog.service';
import { Application } from '@shared/_index';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'hs-applications-page',
  templateUrl: './applications-page.component.html',
  styleUrls: ['./applications-page.component.scss'],
})
export class ApplicationsPageComponent implements OnInit {
  applications$: Observable<Application[]> = this.facade.visibleApplications$;
  selectedApplication$: Observable<Application> = this.facade
    .selectedApplication$;
  constructor(
    private facade: ApplicationsFacade,
    private dialog: DialogService,
    private router: Router
  ) {}
  ngOnInit() {
    this.applications$
      .pipe(
        filter(application => application.length > 0),
        take(1)
      )
      .subscribe(applications => {
        this.router.navigate([`applications/${applications[0].name}`]);
      });
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
}
