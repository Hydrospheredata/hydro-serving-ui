import { Component, OnInit } from '@angular/core';
import { ModelsFacade } from '@models/store';

@Component({
  selector: 'hs-models-page',
  templateUrl: './models-page.component.html',
  styleUrls: ['./models-page.component.scss'],
})
export class ModelsPageComponent implements OnInit {
  container(modelsFacade: ModelsFacade) {}
  ngOnInit() {}
}
