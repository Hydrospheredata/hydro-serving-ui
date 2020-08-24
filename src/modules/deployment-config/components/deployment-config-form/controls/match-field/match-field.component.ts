import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { FormGroup } from '@node_modules/@angular/forms';

@Component({
  selector: 'hs-match-field',
  templateUrl: './match-field.component.html',
  styleUrls: ['../../../../styles/deployment-config.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchFieldComponent implements OnInit {
  @Input() group: FormGroup;
  constructor() {}

  ngOnInit() {}
}
