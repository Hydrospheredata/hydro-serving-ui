import {
  Directive,
  ElementRef,
  OnInit,
  OnDestroy,
  HostListener,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { HydroServingState } from '@core/reducers';
import { getModelVersionsByModelId } from '@models/reducers';
import { Store } from '@ngrx/store';
import { ModelVersion, ModelVersionStatus } from '@shared/_index';
import { Subscription } from 'rxjs';
import { tap, filter } from 'rxjs/operators';

@Directive({
  selector: '[hsUpdateModelVersion]',
})
export class UpdateModelVersionDirective implements OnInit, OnDestroy {
  @Input() modelVersion: ModelVersion;
  @Output() handleClick: EventEmitter<any> = new EventEmitter();

  private latestModelVersionId: number;
  private modelVersionSub: Subscription;

  constructor(public el: ElementRef, private store: Store<HydroServingState>) {}

  @HostListener('click')
  onclick() {
    event.stopPropagation();
    if (this.latestModelVersionId) {
      this.handleClick.emit(this.latestModelVersionId);
    }
  }

  ngOnInit() {
    const {
      model: { id },
      modelVersion,
    } = this.modelVersion;
    this.modelVersionSub = this.store
      .select(getModelVersionsByModelId(this.modelVersion.model.id))
      .pipe(
        filter(modelVersions => !!modelVersions),
        tap((modelVersions: ModelVersion[]) => {
          const latestModelVersions = modelVersions.filter(modelVer => {
            return (
              modelVer.model.id === id &&
              modelVer.modelVersion > modelVersion &&
              modelVer.status.toLocaleLowerCase() ===
                ModelVersionStatus.Released
            );
          });
          const el: HTMLElement = this.el.nativeElement;
          if (latestModelVersions.length) {
            const { id: latestModelVersionId } = latestModelVersions[0];
            el.classList.add('tooltip--is-visible');
            this.latestModelVersionId = latestModelVersionId;
          } else {
            this.latestModelVersionId = undefined;
            el.classList.remove('tooltip--is-visible');
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.modelVersionSub.unsubscribe();
  }
}
