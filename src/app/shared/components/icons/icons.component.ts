import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'hs-icon',
  templateUrl: './icons.template.html',
  styleUrls: ['./icons.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class IconComponent {
  @Input() type: string;
  @Input() title: string;
}
