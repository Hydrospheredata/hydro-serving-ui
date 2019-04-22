import { Directive, ElementRef, Input } from '@angular/core';
import { flatArray } from '@shared/utils/flat-array';

@Directive({
    selector: '[hsPixelToCanvas]',
})
export class PixelToCanvasDirective {
    @Input() width: number;
    @Input() height: number;
    @Input()
    set pixels(pixels) {
        if (pixels) {
            const data = this.transformArrayToPixels(pixels);
            const clampedArray = new Uint8ClampedArray(data);
            const imgData = new ImageData(clampedArray, 28, 28);
            this.context.putImageData(imgData, 0, 0);
        }
    }
    private context: CanvasRenderingContext2D;

    constructor(
        el: ElementRef
    ) {
        this.context = el.nativeElement.getContext('2d');
    }

    private transformArrayToPixels(pixels) {
        const dim = pixels.length / (this.width * this.height);
        switch (dim) {
            case 1:
                return this.grayScaleToRGBA(pixels);
            case 3:
                return this.fromRGBtoRGBA(pixels);
            default:
                break;
        }
    }

    private grayScaleToRGBA(array): number[] {
        const flArray = flatArray(array);
        const rgb = flArray.reduce((acc, cur) => {
            const offset = acc.length;
            acc[offset] = 0;
            acc[offset + 1] = 0;
            acc[offset + 2] = 0;
            acc[offset + 3] = 255 * (1 - cur);

            return acc;
        }, []);
        return rgb;
    }

    private fromRGBtoRGBA(pixels) {
        const fArray = flatArray(pixels);
        const arr = [];

        for (let i = 0, l = fArray.length; i < l; i += 3) {
            const x = arr.length;
            arr[x] = fArray[i];
            arr[x + 1] = fArray[i + 1];
            arr[x + 2] = fArray[i + 2];
            arr[x + 3] = 255;
        }

        return arr;
    }
}
