import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[hsPixelToCanvas]',
})
export class PixelToCanvasDirective {
    data;
    context;

    @Input()
    set pixels(pixels) {
        if (pixels) {
            this.data = this.addAlphaChanel(JSON.parse(pixels));

            var x = new Uint8ClampedArray(this.data);
            const imgData = new ImageData(x, 720, 527);
            this.context.putImageData(imgData, 20, 20);
        }
    }

    constructor(
        el: ElementRef
    ) {
        this.context = el.nativeElement.getContext('2d');
    }

    addAlphaChanel(pixels) {
        const o = pixels.slice('');
        const arr = [];

        for (let i = 0; i < o.length; i += 3) {
            const x = arr.length;
            arr[x] = pixels[i];
            arr[x + 1] = pixels[i + 1];
            arr[x + 2] = pixels[i + 2];
            arr[x + 3] = 255;
        }

        return arr;
    }
}
