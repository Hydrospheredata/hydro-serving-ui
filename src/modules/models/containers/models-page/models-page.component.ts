import { Component } from '@angular/core';
import { ModelsFacade } from '@models/store';
import { Model } from '@shared/_index';
import { Observable } from 'rxjs';

@Component({
  selector: 'hs-models-page',
  templateUrl: './models-page.component.html',
  styleUrls: ['./models-page.component.scss'],
})
export class ModelsPageComponent {
  nonFavoriteModels$: Observable<Model[]> = this.modelsFacade.nonFavoriteModels$;
  favoriteModels$: Observable<Model[]> = this.modelsFacade.favoriteModels$;
  filterString: string = '';
  constructor(private modelsFacade: ModelsFacade) {}

  onChangeFilter(str): void {
    this.modelsFacade.filterString$.next(str);
  }

  handleToggleFavoriteModel(model: Model): void {
   this.modelsFacade.toggleFavorite(model);
  }
}
