import {
  trigger,
  transition,
  animate,
  style,
  query,
  group,
} from '@angular/animations';
import { Component } from '@angular/core';
import { DialogService } from '@dialog/dialog.service';

import { RouterOutlet } from '@angular/router';
import { DialogAddApplicationComponent } from '@applications/components/dialogs';
import { ApplicationsFacade } from '@applications/store';
import { ModelsFacade } from '@models/store';

@Component({
  selector: 'hs-applications-wrapper',
  templateUrl: './applications-wrapper.component.html',
  styleUrls: ['./applications-wrapper.component.scss'],
  animations: [
    trigger('anim', [
      transition('appDetail => appStageDetail', [
        style({
          position: 'relative',
        }),
        query(':leave, :enter', [
          style({
            position: 'absolute',
            width: '100%',
            top: 0,
            left: 0,
          }),
        ]),
        query(':enter', [style({ left: '100%' })]),
        group([
          query(':leave', animate('300ms', style({ left: '-100%' }))),
          query(':enter', [animate('300ms', style({ left: '0px' }))]),
        ]),
      ]),
      transition('appStageDetail => appDetail', [
        style({
          position: 'relative',
        }),
        query(':leave, :enter', [
          style({
            position: 'absolute',
            width: '100%',
            top: 0,
            left: 0,
          }),
        ]),
        query(':enter', [style({ left: '-100%' })]),
        group([
          query(':leave', animate('300ms', style({ left: '100%' }))),
          query(' :enter', [animate('300ms', style({ left: '0px' }))]),
        ]),
      ]),
    ]),
  ],
})
export class ApplicationsWrapperComponent {
  applications$ = this.facade.allApplications$;
  someModelVersionIsReleased$ = this.modelsFacade.someModelVersionIsReleased$;

  constructor(
    private facade: ApplicationsFacade,
    private modelsFacade: ModelsFacade,
    private dialog: DialogService
  ) {}

  public addApplication(): void {
    this.showAddApplicationDialog();
  }

  prepare(outlet: RouterOutlet) {
    return outlet.activatedRouteData && outlet.activatedRouteData.anim;
  }

  private showAddApplicationDialog(): void {
    this.dialog.createDialog({
      component: DialogAddApplicationComponent,
      styles: { height: '100%' },
    });
  }
}
