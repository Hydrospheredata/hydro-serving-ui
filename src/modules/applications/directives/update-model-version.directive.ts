import {
  Directive,
  ElementRef,
  OnInit,
  OnDestroy,
  HostListener,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ModelsFacade } from '@models/store';
import { ModelVersion, ModelVersionStatus } from '@shared/_index';
import { Subscription } from 'rxjs';
import { tap, filter, take } from 'rxjs/operators';

@Directive({
  selector: '[hsUpdateModelVersion]',
})
export class UpdateModelVersionDirective
  implements OnInit, OnDestroy, OnChanges {
  @Input() modelVersion: ModelVersion;
  @Output() handleClick: EventEmitter<any> = new EventEmitter();

  private latestModelVersion: ModelVersion;
  private modelVersionSub: Subscription;

  constructor(public el: ElementRef, private modelsFacade: ModelsFacade) {}

  @HostListener('click')
  onclick() {
    event.stopPropagation();
    if (this.latestModelVersion) {
      this.handleClick.emit(this.latestModelVersion);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const {
      model: { id },
      modelVersion,
    } = this.modelVersion;
    this.modelVersionSub = this.modelsFacade
      .modelVersionsByModelId(this.modelVersion.model.id)
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
        }),
        take(1)
      )
      .subscribe();
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.modelVersionSub.unsubscribe();
  }
}
