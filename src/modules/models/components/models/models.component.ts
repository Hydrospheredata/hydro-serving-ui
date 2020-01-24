import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Model } from '@shared/_index';

@Component({
  selector: 'hs-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModelsComponent {
  @Input() models: Model[];
  @Input() favoriteModels: Model[];
  @Output() toggledFavorite: EventEmitter<Model> = new EventEmitter();

  toggleFavorite(model: Model): void {
    event.stopPropagation();
    this.toggledFavorite.emit(model);
  }
}
