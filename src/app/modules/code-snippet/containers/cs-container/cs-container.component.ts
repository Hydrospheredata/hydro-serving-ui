import { Component } from '@angular/core';
import { commands } from '@app/helpers/model-uploading-commands';

@Component({
  selector: 'cs-container',
  templateUrl: './cs-container.component.html',
  styleUrls: ['./cs-container.component.scss'],
})
export class CsContainerComponent {
  public commands: string[];
  constructor() {
    this.commands = commands;
  }
}
