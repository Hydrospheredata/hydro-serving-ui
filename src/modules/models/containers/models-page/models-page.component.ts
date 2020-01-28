import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModelsFacade } from '@models/store';
import { Model } from '@shared/_index';
import { Observable } from 'rxjs';

@Component({
  selector: 'hs-models-page',
  templateUrl: './models-page.component.html',
  styleUrls: ['./models-page.component.scss'],
})
export class ModelsPageComponent {
  allModels$: Observable<Model[]> = this.modelsFacade.sortedModels$;
  filterString: string = '';
  constructor(private modelsFacade: ModelsFacade, private router: Router) {}

  handleFilter(str): void {
    this.modelsFacade.filterString$.next(str);
  }

  handleToggleFavoriteModel(model: Model): void {
    this.modelsFacade.toggleFavorite(model);
  }

  handleSidebarClick(model: Model): void {
    this.router.navigate([`models/${model.id}`]);
  }
}
