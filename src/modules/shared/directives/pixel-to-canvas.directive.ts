import { Directive, ElementRef, Renderer2, Input} from '@angular/core';

@Directive({
    selector: '[hsPixelToCanvas]',
})
export class PixelToCanvasDirective {
    @Input() width: number;
    @Input() height: number;
    @Input()
    set pixels(pixels) {
        this.renderer.setAttribute(this.el.nativeElement, 'width', `${this.width}`);
        this.renderer.setAttribute(this.el.nativeElement, 'height', `${this.height}`);
        if (pixels) {
            try {

                const clampedArray = new Uint8ClampedArray(pixels);
                const imgData = new ImageData(clampedArray, this.width, this.height);
                this.context.putImageData(imgData, 0, 0);

            } catch (e) {
                console.error(e);
            }
        }
    }
    private context: CanvasRenderingContext2D;

    constructor(
        private el: ElementRef,
        private renderer: Renderer2
    ) {
        this.context = el.nativeElement.getContext('2d');

    }
}
