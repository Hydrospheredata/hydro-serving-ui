import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ModelsFacade } from '@models/store';
import { Model } from '@shared/_index';

@Component({
  selector: 'hs-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModelsComponent {
  @Input() models: Model[];
}
