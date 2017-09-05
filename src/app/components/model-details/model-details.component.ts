import { Component, OnInit } from '@angular/core';
import { HttpModelsService } from '@services/http-models.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'hydro-model-details',
  templateUrl: './model-details.component.html',
  styleUrls: ['./model-details.component.scss']
})
export class ModelDetailsComponent implements OnInit {

  private activatedRouteSub: any;
  public id: string;
  public builds: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private modelsService: HttpModelsService
  ) { }

  ngOnInit() {
    this.activatedRouteSub = this.activatedRoute.params
      .map((params) => {
        this.id = params['modelId'];
        return this.id;
      })
      .subscribe((modelId) => { this.loadInitialData(modelId); });

  }

  loadInitialData(id: string) {
   this.modelsService.getBuildsByModel(id)
   .subscribe((data) => {
    this.builds = JSON.stringify(data);
  });
   console.log(this.builds);
  }


}
