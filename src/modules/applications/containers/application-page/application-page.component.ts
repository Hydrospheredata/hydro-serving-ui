import { Component } from '@angular/core';
import { ApplicationsFacade } from '@applications/store';
import { Observable } from '@node_modules/rxjs';
import { Application } from '@shared/models';

@Component({
  selector: 'hs-application-page',
  templateUrl: './application-page.component.html',
  styleUrls: ['./application-page.component.scss'],
})
export class ApplicationPageComponent {
  application$: Observable<Application>;
  constructor(private facade: ApplicationsFacade) {
    this.application$ = this.facade.selectedApplication$;
  }
}
