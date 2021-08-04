import { Component, Input } from '@angular/core';
import { commands } from '@app/helpers/model-uploading-commands';

@Component({
  selector: 'cs-container',
  templateUrl: './cs-container.component.html',
  styleUrls: ['./cs-container.component.scss'],
})
export class CsContainerComponent {
  @Input() commands: string[];
  constructor() {
    this.commands = commands;
  }
}
