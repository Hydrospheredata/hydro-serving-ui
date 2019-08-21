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

  private latestModelVersion: ModelVersion;
  private modelVersionSub: Subscription;

  constructor(public el: ElementRef, private store: Store<HydroServingState>) {}

  @HostListener('click')
  onclick() {
    event.stopPropagation();
    if (this.latestModelVersion) {
      this.handleClick.emit(this.latestModelVersion);
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
        filter(modelVersions => modelVersions !== undefined),
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
            el.style.display = '';
            this.latestModelVersion = latestModelVersions[0];
          } else {
            this.latestModelVersion = undefined;
            el.style.display = 'none';
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.modelVersionSub.unsubscribe();
  }
}
