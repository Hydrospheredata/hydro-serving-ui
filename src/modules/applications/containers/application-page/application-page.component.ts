import { Component } from '@angular/core';
import { ApplicationsFacade } from '@applications/store';

@Component({
  selector: 'hs-application-page',
  templateUrl: './application-page.component.html',
  styleUrls: ['./application-page.component.scss'],
})
export class ApplicationPageComponent {
  application$ = this.facade.selectedApplication$;
  constructor(private facade: ApplicationsFacade) {
  }
}
