import { Component, OnInit } from '@angular/core';
import { HttpModelsService } from '@services/http-models.service';

@Component({
  selector: 'hydro-models-list',
  templateUrl: './models-list.component.html',
  styleUrls: ['./models-list.component.scss']
})
export class ModelsListComponent implements OnInit {
  private  models;

  constructor(private httpModelsService: HttpModelsService) { }

  ngOnInit() {
  	this.httpModelsService.getAll().subscribe((models) => {
      this.models = models;
    });
  }

}
