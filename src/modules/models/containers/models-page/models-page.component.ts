import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModelsFacade } from '@models/store';
import { Model } from '@shared/_index';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'hs-models-page',
  templateUrl: './models-page.component.html',
  styleUrls: ['./models-page.component.scss'],
})
export class ModelsPageComponent implements OnInit {
  allModels$: Observable<Model[]> = this.modelsFacade.sortedModels$;
  selectedModel$: Observable<Model> = this.modelsFacade.selectedModel$;
  filterString: string = '';
  constructor(private modelsFacade: ModelsFacade, private router: Router) {}

  ngOnInit(){
    this.allModels$
    .pipe(
      filter(models => models.length > 0),
      take(1)
    )
    .subscribe(models => {
        this.router.navigate([`models/${models[0].id}`]);
    });
  }

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
