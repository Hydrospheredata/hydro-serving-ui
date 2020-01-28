import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogAddApplicationComponent } from '@applications/components';
import { ApplicationsFacade } from '@applications/store';
import { DialogService } from '@dialog/dialog.service';
import { Application } from '@shared/_index';
import { Observable } from 'rxjs';

@Component({
  selector: 'hs-applications-page',
  templateUrl: './applications-page.component.html',
  styleUrls: ['./applications-page.component.scss'],
})
export class ApplicationsPageComponent implements OnInit {
  applications$: Observable<Application[]> = this.facade.allApplications$;

  constructor(
    private facade: ApplicationsFacade,
    private dialog: DialogService,
    private router: Router
  ) {}
  ngOnInit() {}

  addApplication(): void {
    this.dialog.createDialog({
      component: DialogAddApplicationComponent,
      styles: { height: '100%' },
    });
  }

  handleFilter(filterStr: string): void {
    console.log('');
  }

  handleBookmark(application: Application): void {
    console.log('handle toggle', { application });
    this.facade.toggleFavorite(application);
  }

  handleSidebarClick(application: Application): void {
    this.router.navigate([`applications/${application.name}`]);
  }
}
