import { Component } from '@angular/core';
import { commands } from '@app/helpers/model-uploading-commands';

@Component({
  selector: 'hs-code-container',
  templateUrl: './code-container.component.html',
  styleUrls: ['./code-container.component.scss'],
})
export class CodeContainerComponent {
  public commands: string[];
  constructor() {
    this.commands = commands;
  }
}
