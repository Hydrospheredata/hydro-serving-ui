import {
  trigger,
  transition,
  animate,
  style,
  query,
  group,
} from '@angular/animations';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModelsFacade } from '@models/store';

@Component({
  selector: 'hydro-models-wrapper',
  templateUrl: './models-wrapper.component.html',
  styleUrls: ['./models-wrapper.component.scss'],
  animations: [
    trigger('anim', [
      transition('modelDetail => modelVerDetail', [
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
      transition('modelVerDetail => modelDetail', [
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
export class ModelsWrapperComponent {
  models$ = this.modelsFacade.allModels$;

  constructor(private modelsFacade: ModelsFacade) {}

  prepareAnimation(outlet: RouterOutlet) {
    return outlet.activatedRouteData && outlet.activatedRouteData.anim;
  }
}
