import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, Model } from '@shared/_index';
import * as Actions from '@shared/actions/_index';

@Component({
    selector: 'hydro-models-wrapper',
    templateUrl: './models-wrapper.component.html',
    styleUrls: ['./models-wrapper.component.scss']
    })
export class ModelsWrapperComponent implements OnInit {

  public sidebarTitle = 'Models';
  public models: Store<Model[]>;


  constructor(
    private store: Store<AppState>,
  ) {

  }
  ngOnInit() {
      this.store.dispatch({ type: Actions.LOAD_MODELS, payload: null });
      this.models = this.store.select('models');
  }

}
