import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, Model } from '@shared/models/_index';
import * as Actions from '@shared/actions/_index';
import { CanActivate, Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'hydro-models-wrapper',
  templateUrl: './models-wrapper.component.html',
  styleUrls: ['./models-wrapper.component.scss']
})
export class ModelsWrapperComponent implements OnInit {


  private data: Model[];
  public sidebarTitle = 'Models';
  public models: Store<Model[]>;


  constructor(
    private router: Router,
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute
  ) {

  }
  ngOnInit() {
    this.store.dispatch({ type: Actions.LOAD_MODELS, payload: null });
    this.models = this.store.select('models');
  }

}
