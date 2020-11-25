import { Component, OnInit } from '@angular/core';

import { ModelsHeaderService } from './models-header.service';
import { ViewChild, ElementRef } from '@node_modules/@angular/core';
import { Observable } from '@node_modules/rxjs';
import { ModelVersion, Model } from '@app/core/data/types';

@Component({
  selector: 'hs-models-header',
  templateUrl: './models-header.component.html',
  styleUrls: ['./models-header.component.scss'],
  providers: [ModelsHeaderService],
})
export class ModelsHeaderComponent implements OnInit {
  @ViewChild('siblings', { read: ElementRef }) siblingsEl: ElementRef;

  showButton$: Observable<boolean>;
  model$: Observable<Model>;
  modelVersion$: Observable<ModelVersion>;
  siblings$: Observable<ModelVersion[]>;
  service$: Observable<string>;

  constructor(private readonly service: ModelsHeaderService) {}

  ngOnInit() {
    this.showButton$ = this.service.isButtonShowed();
    this.model$ = this.service.getModel();
    this.modelVersion$ = this.service.getModelVersion();
    this.siblings$ = this.service.getSiblings();
    this.service$ = this.service.getService();
  }

  onEnter() {
    this.siblingsEl.nativeElement.classList.add(
      'models-header__siblings-showed'
    );
  }

  onLeave() {
    this.siblingsEl.nativeElement.classList.remove(
      'models-header__siblings-showed'
    );
  }

  onClickModel() {
    this.service.onClickModel();
  }

  onClickModelVersion() {
    this.service.onClickModelVersion();
  }

  onClickSibling(sibling: ModelVersion) {
    this.service.onClickSibling(sibling);
  }

  onDelete() {
    this.service.onDelete();
  }
}
