import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { FormGroup } from '@node_modules/@angular/forms';

@Component({
  selector: 'hs-toleration',
  templateUrl: './toleration.component.html',
  styleUrls: ['../../../../styles/deployment-config.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TolerationComponent implements OnInit {
  @Input() group: FormGroup;

  constructor() {}

  ngOnInit() {}
}
