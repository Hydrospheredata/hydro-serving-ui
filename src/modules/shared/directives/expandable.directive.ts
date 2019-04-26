import { Directive, ElementRef, Renderer2, ViewChild, AfterViewInit, ContentChild } from '@angular/core';

@Directive({
    selector: '[hsExpandable]',
})
export class ExpandableDirective implements AfterViewInit {
    @ContentChild('expandableHeader', {read: ElementRef}) header: ElementRef;
    @ContentChild('expandableBody', {read: ElementRef}) body: ElementRef;
    @ContentChild('expandableText', {read: ElementRef}) text: ElementRef;

    isExpanded: boolean = false;
    constructor(
        private el: ElementRef,
        private renderer: Renderer2
    ) {
    }

    ngAfterViewInit(): void {
        this.body.nativeElement.hidden = !this.isExpanded;
        this.text.nativeElement.innerText = this.isExpanded ? 'collapse' : 'expand';

        this.header.nativeElement.addEventListener('click', () => {
            this.isExpanded = !this.isExpanded;
            this.text.nativeElement.innerText = this.isExpanded ? 'collapse' : 'expand';
            this.body.nativeElement.hidden =  !this.isExpanded;
        });
    }
}
