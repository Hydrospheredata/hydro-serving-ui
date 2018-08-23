import { Directive, Input, OnInit, ContentChild, ElementRef } from '@angular/core';
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

        if(this.statusIcon){
            this.statusIcon.type = this.getIconType(this.status);
        };

        if(this.statusText){
            this.statusText.nativeElement.textContent = this.getStatusText(this.status);
        }
    }

    private getIconType(status: string): string {
        let iconType: string;

        switch(status){
            case 'started':
                iconType = 'icon-arrow';
                break;
            case 'finished':
                iconType = 'icon-done';
                break;
            case 'error':
                iconType = 'icon-error-outline';
                break;
            default:
                iconType = 'icon-pending';
        }
        
        return iconType;
    }

    private getStatusText(status: string): string {
        let textStatus: string;
        
        switch(status){
            case 'started':
                textStatus = 'Started';
                break;
            case 'finished':
                textStatus = 'Released';
                break;
            case 'error':
                textStatus = 'Error';
                break;
            default:
                textStatus = 'Pending';
        }

       return textStatus;
    }
} 