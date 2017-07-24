import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpModelsService } from '@services/http-models.service';

@Component({
  selector: 'hydro-single-model',
  templateUrl: './single-model.component.html',
  styleUrls: ['./single-model.component.scss']
})
export class SingleModelComponent implements OnInit {
  public model;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpModelsService: HttpModelsService,
    private _location: Location
  ) {

  }

  historyBack() {
    this._location.back();
  }

  ngOnInit() {
    this.activatedRoute.params
      .map( params => params['modelId'] )
      .subscribe((id) => {
        this.httpModelsService.getAll().subscribe((models) => {
          let model = models.filter(model => {
            return model.id == id;
          });
          this.model = model[0];
        });
      });
  }

}
