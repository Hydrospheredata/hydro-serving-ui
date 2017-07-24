import { Component, OnInit } from '@angular/core';
import { HttpRuntimeTypesService } from '@services/http-runtime-types.service';
import { RuntimeType } from '@models/runtime-type';

@Component({
  selector: 'hydro-models-wrapper',
  templateUrl: './models-wrapper.component.html',
  styleUrls: ['./models-wrapper.component.scss']
})
export class ModelsWrapperComponent implements OnInit {
  public runtimeTypes: RuntimeType[];
  public currentRuntimeType: RuntimeType;
  constructor(private httpRuntimeTypesService: HttpRuntimeTypesService) { }

  ngOnInit() {
    this.httpRuntimeTypesService.getAll().subscribe((runtimeType) => {
      this.runtimeTypes = runtimeType;
    });
  }

}
