import { Component, OnInit, Input } from '@angular/core';
import { getFiledNameByTensorDataType } from '@shared/utils/field-name-by-tensor-data-type';
import { flatArray } from '@shared/utils/flat-array';
import { fromSnakeToCamel } from '@shared/utils/from-snake-to-camel';

@Component({
    selector: 'hs-tensor-image-list',
    templateUrl: './tensor-image-list.component.html',
    styleUrls: ['./tensor-image-list.component.scss'],
})
export class TensorImageListComponent implements OnInit {
    imagesCount: number;
    imageWidth: number;
    imageHeight: number;
    imagePixelsArray: number[][];

    readonly elementsForRGBA = 4;

    @Input()
    set tensorProto(tensorProto) {
        let dim;
        try {
            dim = tensorProto.tensorShape.dim;
            const [imagesCount, imageWidth, imageHeight] = dim;
            this.imagesCount = imagesCount.size;
            this.imageWidth = imageWidth.size;
            this.imageHeight = imageHeight.size;

            const allPixels = this.getValue(tensorProto);
            let arrayOfRGBAPixels;

            try {
                arrayOfRGBAPixels = this.transformArrayToRGBAPixels(allPixels);
                try {
                    const imagePixels = this.imageWidth * this.imageHeight * this.elementsForRGBA;
                    this.imagePixelsArray = this.partitionArrayBySize(arrayOfRGBAPixels, imagePixels);
                } catch (error) {
                    throw Error('Cant split data');
                }
            } catch (err) {
                console.dir(err);
            }

        } catch (error) {
            throw Error('Did not found dim property in tensorShape');
        }
    }

    ngOnInit(): void {
    }

    private transformArrayToRGBAPixels(pixels): number[]  {
        const dim = (pixels.length / (this.imageWidth * this.imageHeight)) / this.imagesCount;
        switch (dim) {
            case 1:
                return this.grayScaleToRGBA(pixels);
            case 3:
                return this.fromRGBtoRGBA(pixels);
            default:
                throw Error('Cant recognize image type');
                break;
        }
    }

    private getValue(tensorProto): any {
        const field = fromSnakeToCamel(getFiledNameByTensorDataType(tensorProto.dtype));
        const data = tensorProto[field];
        return data;
    }

    private partitionArrayBySize(arr, size): number[][] {
        let offset = 0;
        const arrLength = arr.length;
        const res = [];

        while (offset < arrLength) {
            res.push(arr.slice(offset, offset + size));
            offset += size;
        }

        return res;
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
