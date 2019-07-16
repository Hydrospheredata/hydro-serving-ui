import {
  Directive,
  Input,
  ContentChild,
  ElementRef,
} from '@angular/core';
import { IconComponent } from '@shared/_index';
import { ModelVersionStatus } from '@shared/models/_index';
@Directive({
  selector: '[hsModelVersionStatus]',
})
export class ModelVersionStatusDirective {
  @ContentChild('statusIcon') statusIcon: IconComponent;
  @ContentChild('statusText') statusText: ElementRef;
  @Input()
  set status(status: string) {
    if (this.statusIcon) {
      this.statusIcon.type = this.getIconType(status);
    }

    if (this.statusText) {
      this.statusText.nativeElement.textContent = status;
    }
  }

  private getIconType(status: string): string {
    let iconType: string;

    switch (status) {
      case ModelVersionStatus.Assembling:
        iconType = 'icon-circle';
        break;
      case ModelVersionStatus.Released:
        iconType = 'icon-done';
        break;
      case ModelVersionStatus.Failed:
        iconType = 'icon-error-outline';
        break;
      default:
        iconType = 'icon-pending';
    }

    return iconType;
  }
}
