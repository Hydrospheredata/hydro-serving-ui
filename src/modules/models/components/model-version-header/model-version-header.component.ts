import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModelsFacade } from '@models/store';
import {
  Router,
  ActivatedRoute,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@node_modules/@angular/router';
import { Observable } from '@node_modules/rxjs';
import { ModelVersion } from '@shared/models';
import { neitherNullNorUndefined } from '@shared/utils';

@Component({
  selector: 'hs-model-version-header',
  templateUrl: './model-version-header.component.html',
  styleUrls: ['./model-version-header.component.scss'],
})
export class ModelVersionHeaderComponent implements OnInit {
  modelVersion$: Observable<ModelVersion>;
  siblings$: Observable<ModelVersion[]>;

  @ViewChild('siblings', { read: ElementRef }) siblingsEl: ElementRef;

  constructor(private readonly facade: ModelsFacade, private router: Router) {}

  ngOnInit() {
    this.modelVersion$ = this.facade.selectedModelVersion$;
    this.siblings$ = this.facade.siblingModelVersions$;
  }

  onEnter() {
    this.siblingsEl.nativeElement.classList.add('mv-header__siblings-showed');
  }

  onLeave() {
    this.siblingsEl.nativeElement.classList.remove(
      'mv-header__siblings-showed'
    );
  }

  onClickModelVersion(): void {
    const [, root, modelId, modelVerId] = this.router.url.split('/');
    this.router.navigate([root, modelId, modelVerId]);
  }
  onClickSibling(modelVersion: ModelVersion): void {
    const [, root, modelId, , ...tail] = this.router.url.split('/');
    this.router.navigate([root, modelId, modelVersion.id, ...tail]);
  }
}
