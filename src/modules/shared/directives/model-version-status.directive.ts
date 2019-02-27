import { Directive, Input, OnInit, ContentChild, ElementRef } from '@angular/core';
import { IconComponent } from '@shared/_index';
import { ModelVersionStatus } from '@shared/models/_index';
@Directive({
    selector: '[hsModelVersionStatus]',
})
export class ModelVersionStatusDirective implements OnInit {
    @ContentChild('statusIcon') statusIcon: IconComponent;
    @ContentChild('statusText') statusText: ElementRef;
    @Input() public status: string;

    ngOnInit() {
        if (this.statusIcon) {
            this.statusIcon.type = this.getIconType(this.status);
        }

        if (this.statusText) {
            this.statusText.nativeElement.textContent = this.status;
        }
    }

    private getIconType(status: string): string {
        let iconType: string;

        switch (status) {
            case ModelVersionStatus.Assembling:
                iconType = 'icon-arrow';
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
