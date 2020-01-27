import { Component, OnInit, Input } from '@angular/core';
import { ModelVersion } from '@shared/_index';

@Component({
  selector: 'hs-model-versions',
  templateUrl: './model-versions.component.html',
  styleUrls: ['./model-versions.component.scss'],
})
export class ModelVersionsComponent implements OnInit {
  @Input() modelVersions: ModelVersion[] = [];

  ngOnInit() {}
}
