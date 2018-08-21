import { Directive, Input, OnInit, ContentChild, ElementRef,  } from '@angular/core';
import { IconComponent } from '@shared/_index';
 @Directive({
    selector: '[modelStatus]'
})
export class ModelStatusDirective implements OnInit{
    @ContentChild('statusIcon') statusIcon: IconComponent;
    @ContentChild('statusText') statusText: ElementRef;
    @Input() public status: string;
    
    ngOnInit(){
        this.status = this.status.toLowerCase();

        this.statusIcon.type = this.getIconType(this.status);
        this.statusText.nativeElement.textContent = this.getStatusText(this.status);
    }

    private getIconType(status: string): string {
        let iconType: string = '';
        switch(status){
            case 'pending':
                iconType = 'icon-pending';
                break;
            case 'finished':
                iconType = 'icon-done';
                break;
            case 'started':
                iconType = 'icon-arrow';
                break;
            case 'error':
                iconType = 'icon-error-outline';
                break;
        }
        return iconType;
    }

    private getStatusText(status: string){
       return status === 'finished' ? 'Released' : 'Started'
    }
} 