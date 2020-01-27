import { Component, OnInit } from '@angular/core';
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
  applications$: Observable<Application[]> = this.facade.nonFavoriteApplications$;
  favoriteApplications$: Observable<Application[]> = this.facade.favoriteApplications$;

  constructor(
    private facade: ApplicationsFacade,
    private dialog: DialogService
  ) {}
  ngOnInit() {}

  addApplication(): void {
    this.dialog.createDialog({
      component: DialogAddApplicationComponent,
      styles: { height: '100%' },
    });
  }

  handleToggleFavorite(application: Application): void {
    console.log('handle toggle', { application });
    this.facade.toggleFavorite(application);
  }
}
