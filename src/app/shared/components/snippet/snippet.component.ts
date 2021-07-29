import { Component, Input } from '@angular/core';
import { SnackbarService } from '@app/core/snackbar.service';

@Component({
  selector: 'hs-snippet',
  templateUrl: './snippet.component.html',
  styleUrls: ['./snippet.component.scss'],
})
export class SnippetComponent {
  @Input() command: string;

  constructor(private snackbar: SnackbarService) {}

  copySnippet() {
    const temp = document.createElement('input') as HTMLInputElement;
    const body = document.getElementsByTagName('body')[0];
    body.appendChild(temp);
    temp.setAttribute('value', this.command);
    temp.select();
    document.execCommand('copy');
    body.removeChild(temp);
    this.snackbar.show({ message: 'Code copied', timeout: 1500 });
  }
}
